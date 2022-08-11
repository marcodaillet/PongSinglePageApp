import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { User } from './../user/user.entity'


@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    name : string;
    @Column({ nullable: true })
    isSecrete:boolean;
    @Column({ nullable: true })
    isDirectConv:boolean;
    @Column({ nullable: true })
    password:string;
}

@Entity('chat_user')
export class ChatUser {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    chatId : number;
    @Column({ nullable: true })
    userId:number;
}

@Entity('chat_admin')
export class ChatAdmin {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    chatId : number;
    @Column({ nullable: true })
    adminId:number;
}