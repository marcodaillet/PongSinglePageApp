import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import * as dataFc from "./../functionApi/fcForDatabase";
import { Server, Socket } from 'socket.io';
import { AppDataSource } from './../functionApi/connect';
import { DataSource, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
let structApiPong;
let myGame;
let myRaq1;
let myRaq2;
let myBall;

@WebSocketGateway({
	cors:{
		origin:"*",
	}
})
export class SocketEvents{
	constructor() {
		console.log("On est bien la !");
	}
	@WebSocketServer()
	server: Server;
	handleConnection(client: Socket){
		console.log("Socket connecter coter server!");
	}
	handleDistConnection(client: Socket){
		console.log("Socket deconnecter coter server!");
	}
	@SubscribeMessage('Lancer de comunication')
	async handleEvent(@MessageBody() data: {data:dataFc.PongProps, canvasX:number}, @ConnectedSocket() client: Socket)
	{
		myGame = new dataFc.Games();
		myRaq1 = new dataFc.Raquettes();
		myRaq2 = new dataFc.Raquettes();
		myBall = new dataFc.Balls();
		console.log("salut mon pote", data.data.userId);
		await connectToDatabase();
		console.log("salut mon pote", data.data.userId);
		await searchGame(data);
		client.emit('update', {myGame, myRaq1, myRaq2})
		client.on('update', async () => {
		 	myGame = await dataFc.TakeGameById(structApiPong, myGame.id);
		 	myRaq1 = await dataFc.TakeRaquetteById(structApiPong, myGame.raq1);
		 	myRaq2 = await dataFc.TakeRaquetteById(structApiPong, myGame.raq2);
		 	myBall = await dataFc.TakeBallById(structApiPong, myGame.id);
		 	client.emit('update', {myGame, myRaq1, myRaq2, myBall})
		})
		// client.on('run', async () => {
		// 	myGame = await dataFc.TakeGameById(structApiPong, myGame.id);
		// 	myRaq1 = await dataFc.TakeRaquetteById(structApiPong, myGame.raq1);
		// 	myRaq2 = await dataFc.TakeRaquetteById(structApiPong, myGame.raq2);
		// 	myBall = await dataFc.TakeBallById(structApiPong, myGame.id);
		//  	client.emit('run', {myGame, myRaq1, myRaq2, myBall});
		// })
		// client.on('mouvBall', async (data) => {
		// 	mouvBall(data.newX, data.newY);
		// })
		// client.on('mouvPoint', async (data) => {
		// 	mouvPoint(data.point1, data.point2);
		// })
		// client.on('mouvWinner', async (data) => {
		// 	mouvWinner(data.winner);
		// })
		// client.on('mouvRaq', async (data) => {
		// 	mouvRaq(data);
		// })
		// client.on('end', async (data) => {
		// 	end(data);
		// })
	}
}

async function connectToDatabase()
{
	structApiPong = new DataSource({
		type: "postgres",
		host: "localhost",
		port: 5432,
		username: "postgres",
		password: "root",
		database: "transandance",
		synchronize: true,
		logging: false,
		entities: [dataFc.Raquettes, dataFc.Balls, dataFc.Games, dataFc.Historique],
	})
	await structApiPong.initialize()
	.then(() => {
		console.log("Nous voila connecter !");
	})
	.catch((error) => {console.log("il y a un probleme de connection : ", error);})
}

async function searchGame(data){
	let tmpGame;
	let raquette;
	let raqCheck;
	if (data.data.gameId != -1)
 	 	tmpGame = await dataFc.TakeGameById(structApiPong, data.data.gameId);
	else if (data.data.priv === true)
		tmpGame = await dataFc.insertGame(structApiPong, data.canvasX, data.data.type, data.data.priv);
	else
	{
		tmpGame = await dataFc.TakeGameByRaq1(structApiPong, data.data.type);
		if 	(tmpGame === null || tmpGame.raq1 == -1)
		{
			tmpGame = await dataFc.TakeGameByRaq2(structApiPong, data.data.type);
			if (tmpGame != null)
				raqCheck = await dataFc.TakeRaquetteById(structApiPong, tmpGame.raq1);
		}	

		if (tmpGame === null /* || raqCheck.user_id === data.data.userId*/)
			tmpGame = await dataFc.insertGame(structApiPong, data.canvasX, data.data.type, data.data.priv);
	}

	if (tmpGame.raq1 === -1)
	{
		myBall = await dataFc.insertBall(structApiPong, tmpGame.canvasX/2, tmpGame.canvasY/2); 
		await dataFc.mouvGameBallId(structApiPong, tmpGame, myBall.id);
		raquette = await dataFc.insertRaquette(structApiPong, tmpGame.blocksize ,tmpGame.canvasY/2 - (tmpGame.blocksize * (5 - tmpGame.dificult))/2, tmpGame.blocksize * (5 - tmpGame.dificult), data.data.userId ,false);
		await dataFc.mouvGameRaq1(structApiPong, tmpGame,raquette.id);
		myRaq1 = raquette;
	}
	else
	{
		raquette = await dataFc.insertRaquette(structApiPong, tmpGame.canvasX - (tmpGame.blocksize * 2),tmpGame.canvasY/2 - (tmpGame.blocksize * (5 - tmpGame.dificult))/2, tmpGame.blocksize * (5 - tmpGame.dificult), data.data.userId ,false);
		await dataFc.mouvGameRaq2(structApiPong, tmpGame,raquette.id);
		myRaq2 = raquette;
	}
	myGame = tmpGame;
}


async function mouvBall(newX, newY)
{
	await dataFc.mouvBallPyById(structApiPong, myGame.ball_id, newY);
	await dataFc.mouvBallPxById(structApiPong, myGame.ball_id, newX);
}

async function mouvPoint(point1, point2)
{
	await dataFc.mouvGamePoint1ById(structApiPong, myGame, point1);
	await dataFc.mouvGamePoint2ById(structApiPong, myGame, point2);
}

async function mouvWinner(winner)
{
	if (winner === 1)
		await dataFc.mouvGameWinnerById(structApiPong, myGame, myRaq1.user_id);
	else if (winner === 2)
		await dataFc.mouvGameWinnerById(structApiPong, myGame, myRaq2.user_id);
}

async function mouvRaq(data)
{
	let pastP_y;
	
	if (data.witchRaq === 1)
	{
		pastP_y = (await dataFc.TakeRaquetteById(structApiPong, myGame.raq1)).p_y;
		await dataFc.mouvRaquettePyById(structApiPong, myGame.raq1, pastP_y + data.p_y)
	}
	else if (data.witchRaq === 2)
	{
		pastP_y = (await dataFc.TakeRaquetteById(structApiPong, myGame.raq2)).p_y;
		await dataFc.mouvRaquettePyById(structApiPong, myGame.raq2, pastP_y + data.p_y)
	}

}

async function end(data)
{
	await dataFc.insertHistorique(structApiPong, data);
	await dataFc.delateGame(structApiPong, myGame);
}