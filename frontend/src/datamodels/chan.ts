import User from "./user";

export type Chan = {
    id: number;
    name: string;
    isPrivate: boolean;
    isDirectConv: boolean;
    creatorId: number;
    users: User[];
    password?: string
}