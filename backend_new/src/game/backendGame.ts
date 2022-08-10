/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   backendGame.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/10 11:03:03 by mbonnet           #+#    #+#             */
/*   Updated: 2022/08/10 12:15:32 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Server, Socket } from 'socket.io';
import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import * as GameService from './game.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Games, Balls, Raquettes, Historique } from './game.entity';



@WebSocketGateway({
	cors:{
		origin:"*",
	}
})
export class GamePlay {
    myApi;
    constructor(
		@InjectRepository(Games) private readonly GamesRepository: Repository<Games>,
	) {}
    @WebSocketServer()
	server: Server;
	handleConnection(client: Socket){
		console.log("Socket connecter coter server!");
	}
	handleDistConnection(client: Socket){
		console.log("Socket deconnecter coter server!");
	}
	@SubscribeMessage('Lancer de comunication')
	async handleEvent(@MessageBody() data, @ConnectedSocket() client: Socket)
	{
		
	}
}
