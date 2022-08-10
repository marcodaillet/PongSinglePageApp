import { StringifyOptions } from "querystring";

export interface GameInterface {
    firstPlayerName: string;
    firstPlayerId: number;
    secondPlayerName: string;
    secondPlayerId: number;
    gameId: number;
    gameUrl: string;
};

export interface GameData {
    gameId: number;
    gameUrl: string;
    firstPlayerName: string;
    firstPlayerId: number;
    firstPlayerScore: number;
    secondPlayerName: string;
    secondPlayerId: number;
    secondPlayerScore: number;
    winner: number;
    loser: number;
    currentlyGoingOn: boolean;
}