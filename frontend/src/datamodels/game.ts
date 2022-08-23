import { StringifyOptions } from "querystring";

export interface GameData {
    id: number
    coter_winner: number;
    winner_id: number;
    winner_name?: string;
    looser_id: number;
    looser_name?: string;
    winner_point: number;
    looser_point: number;
    dificult: number;  
}

