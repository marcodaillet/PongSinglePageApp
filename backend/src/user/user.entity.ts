import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { Chat } from './../chat/chat.entity'

@Entity('users')
export class User {
    @PrimaryColumn({ unique: true })
    id: number;
    @Column()
    avatar: string;
    @Column({ unique: true })
    username: string;
    @Column( { unique: true })
    email: string;
    @Column({ unique: true })
    phoneNumber: string;
    @Column()
    status: string;
    @Column()
    twofa: boolean;
    @Column({nullable: true})
    twoFactorSecret?: string;
    @Column()
    privateGame: number;
    @Column()
    privatePartner: number;
    @ManyToMany(() => User)
    @JoinTable()
    friends: User[];
    @ManyToMany(() => User)
    @JoinTable()
    blocked: User[];
    @ManyToMany(
        () => Chat
    )
    @JoinTable()
    myChat: Chat[];
    @Column({nullable: true})
    userType?: number;
}