/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fcForDatabase.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/04 10:41:19 by mbonnet           #+#    #+#             */
/*   Updated: 2022/08/10 14:32:36 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { OneToOne, JoinColumn, DataSource, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AppDataSource } from "./connect";

@Entity()
export class Raquettes {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ nullable: true })
    user_id?:number;
    @Column({ nullable: true })
    p_x?:number;
    @Column({ nullable: true })
    p_y?:number;
    @Column({ nullable: true })
    t_y?:number;
    @Column({ nullable: true })
    connect?:boolean;
}

@Entity()
export class Balls {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ nullable: true })
    p_x?:number;
    @Column({ nullable: true })
    p_y?:number;
	@Column({ nullable: true })
    connect?:boolean;
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number
	@Column({ nullable: true })
	name: string;
    @Column({ nullable: true })
    raq_id: number ;
}

@Entity()
export class Historique {
    @PrimaryGeneratedColumn()
    id: number
	@Column({ nullable: true })
	coter_winner: number;
	@Column({ nullable: true })
	winner_id: number;
	@Column({ nullable: true })
	looser_id: number;
	@Column({ nullable: true })
  	winner_point: number;
	@Column({ nullable: true })
  	looser_point: number;
	@Column({ nullable: true })
	dificult: number;  
}

@Entity()
export class Games {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ nullable: true })
    ball_id:number ;
    @Column({ nullable: true })
    canvasX:number ;
    @Column({ nullable: true })
    canvasY:number ;
    @Column({ nullable: true })
    blocksize:number ;
    @Column({ nullable: true })
    raq1: number ;
    @Column({ nullable: true })
    raq2: number ;
	@Column({ nullable: true })
    point1: number ;
	@Column({ nullable: true })
    point2: number ;
    @Column({ nullable: true })
    dificult:number ;
    @Column({ nullable: true })
    winner: number;
	@Column({ nullable: true })
    private: boolean;
}

export type PongProps = {
    userId: number,
	type: number,
    priv: number,
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@ deb des insert @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

//@@@@@@@@@@@@@@@@@@@@@ insert game @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

export async function insertGame(app, canvasX, dificult, priv){
	const GameTmp: Games = new Games();
    GameTmp.ball_id = -1;
    GameTmp.canvasX = canvasX;
    GameTmp.canvasY = GameTmp.canvasX*0.6;
    GameTmp.blocksize = GameTmp.canvasX/50;
	GameTmp.raq1 = -1;
	GameTmp.raq2 = -1;
    GameTmp.dificult = dificult;
	GameTmp.winner = -1;
	GameTmp.point1 = 0;
	GameTmp.point2 = 0;
	GameTmp.private = priv;
	await app.manager.save(GameTmp);
	return (GameTmp);
}

//@@@@@@@@@@@@@@@@@@@@@ insert raquette @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

export async function insertRaquette(app: DataSource, p_x : number, p_y : number, t_y : number,  user_id : number, connect: boolean){
	const RaquetteTmp: Raquettes = new Raquettes();
	RaquetteTmp.p_x = p_x;
	RaquetteTmp.p_y = p_y;
	RaquetteTmp.t_y = t_y;
	RaquetteTmp.user_id = user_id;
	RaquetteTmp.connect = connect;
	await app.manager.save(RaquetteTmp);
    return (RaquetteTmp);
}


//@@@@@@@@@@@@@@@@@@@@@ insert ball @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

export async function insertBall(app, p_x : number, p_y : number){
	const ballTmp: Balls = new Balls();
	ballTmp.p_x = p_x;
	ballTmp.p_y = p_y;
	await app.manager.save(ballTmp);
    return (ballTmp);
}

export async function insertHistorique(app, data){
	const histTmp: Historique = new Historique();
	histTmp.coter_winner = data.coter_winner;
	histTmp.winner_id = data.winner_id;
	histTmp.looser_id = data.looser_id;
	histTmp.winner_point = data.winner_point;
	histTmp.looser_point = data.looser_point;
	histTmp.dificult = data.dificult;
	await app.manager.save(histTmp);
    return (histTmp);
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@ fin des insert @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@ deb des take   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

export async function TakeGameByRaq1(app: DataSource, dif){
	let Game = await app.manager.getRepository(Games).findOneBy({
		raq1 : -1,
		private : false,
		dificult : dif
	})
	return (Game);
}

export async function TakeGameById(app: DataSource, id: number){
	let Game = await app.manager.getRepository(Games).findOneBy({
		id : id,
	})
	return (Game);
}

export async function TakeGameByRaq2(app: DataSource, dif){
	var Game = await app.manager.getRepository(Games).findOneBy({
		raq2 : -1,
		private : false,
		dificult : dif
	})
	return (Game);
}

export async function TakeRaquetteByConnect(app: DataSource){
	var Game = await app.manager.getRepository(Raquettes).findOneBy({
		connect : false,
	})
	return (Game);
}

export async function TakeRaquetteById(app: DataSource, id: number){
	var raq = await app.manager.getRepository(Raquettes).findOneBy({
		id : id
	})
	return (raq);
}

export async function TakeBallById(app: DataSource, id: number){
	var raq = await app.manager.getRepository(Balls).findOneBy({
		id : id
	})
	return (raq);
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@ fin des take @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@ deb des mouv   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

export async function mouvGameRaq1(app: DataSource, game: Games, raq1: number){
	game.raq1 = raq1;
	app.manager.save(game)
}

export async function mouvGameRaq2(app: DataSource, game: Games, raq2: number){
	game.raq2 = raq2;
	app.manager.save(game)
}

export async function mouvGameBallId(app: DataSource, game: Games, ball_id: number){
	game.ball_id = ball_id;
	app.manager.save(game)
}

export async function mouvRaquettePxById(app: DataSource, raq_id: number, p_x: number){
    let raq = await TakeRaquetteById(app, raq_id);
	raq.p_x = p_x;
	app.manager.save(raq);
}
export async function mouvRaquettePyById(app: DataSource, raq_id: number, p_y: number){
    let raq = await TakeRaquetteById(app, raq_id);
	raq.p_y = p_y;
	app.manager.save(raq);
}
export async function mouvRaquetteTyById(app: DataSource, raq_id: number, t_y: number){
    let raq = await TakeRaquetteById(app, raq_id);
	raq.t_y = t_y;
	app.manager.save(raq);
}

export async function mouvBallPyById(app: DataSource, ball_id: number, p_y: number){
    let ball = await TakeBallById(app, ball_id);
	ball.p_y = p_y;
	app.manager.save(ball);
}

export async function mouvBallPxById(app: DataSource, ball_id: number, p_x: number){
    let ball = await TakeBallById(app, ball_id);
	ball.p_x = p_x;
	app.manager.save(ball);
}


export async function mouvGamePoint1ById(app: DataSource, game: Games, point: number){
    let mygame = await TakeGameById(app, game.id);
	mygame.point1 = point;
	app.manager.save(mygame);
}
export async function mouvGamePoint2ById(app: DataSource, game: Games, point: number){
    let mygame = await TakeGameById(app, game.id);
	mygame.point2 = point;
	app.manager.save(mygame);
}

export async function mouvGameWinnerById(app: DataSource, game: Games, winner: number){
    let mygame = await TakeGameById(app, game.id);
	mygame.winner = winner;
	app.manager.save(mygame);
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@ fin des take @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@ deb des mouv   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

export async function delateGame(app: DataSource, game: Games)
{
	let id_game = await TakeGameById(app,game.id);
	let id_raq1 = await TakeRaquetteById(app,game.raq1);
	let id_raq2 = await TakeRaquetteById(app,game.raq2);	;
	let id_ball = await TakeBallById(app,game.ball_id);
	
	await app.manager.getRepository(Games).remove(id_game);	
	await app.manager.getRepository(Raquettes).remove(id_raq1);	
	await app.manager.getRepository(Raquettes).remove(id_raq2);	
	await app.manager.getRepository(Balls).remove(id_ball);
}