import { StringifyOptions } from "querystring";

export type User = {
    id: number;
    username: string;
    isLoggedIn: boolean;
    avatar?: string;
    status?: string;
    numberWins: number;
    numberLosses: number;
    numberGamesPlayed: number;
    twofa: boolean;
    userType?: number;
};

export default User;