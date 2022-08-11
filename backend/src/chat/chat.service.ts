import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Chat, ChatAdmin, ChatUser } from './Chat.entity';


@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private readonly ChatRepository: Repository<Chat>,
        @InjectRepository(ChatAdmin) private readonly ChatAdminRepository: Repository<ChatAdmin>,
        @InjectRepository(ChatUser) private readonly ChatUserRepository: Repository<ChatUser>,
       
       ) {}
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@ deb take @@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    async takeChat(){
        let res = await this.ChatRepository.find();
        return (res);
    }
    async takeChatById(id:number){
        let res = await this.ChatRepository.findOneBy({
            id:id
        });
        return (res);
    }

    async takeChatByuserId(id:number){
        let res = await this.ChatRepository.findOneBy({
            id:id
        });
        return (res);
    }

    async takeChatUser(){
        let res = await this.ChatUserRepository.find();
        return (res);
    }
    async takeChatUserByChatId(id:number){
        let res = await this.ChatUserRepository.findBy({
            chatId:id
        });
        return (res);
    }

    async takeChatUserByUserId(id:number){
        let res = await this.ChatUserRepository.findOneBy({
            userId:id
        });
        return (res);
    }

    async takeChatAdmin(){
        let res = await this.ChatAdminRepository.find();
        return (res);
    }
    async takeChatAdminByChatId(id:number){
        let res = await this.ChatAdminRepository.findOneBy({
            chatId:id
        });
        return (res);
    }

    async takeChatAdminByAdminId(id:number){
        let res = await this.ChatAdminRepository.findOneBy({
            adminId:id
        });
        return (res);
    }
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@ fin take @@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@ deb mouv @@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    async mouvNameChatById(id:number, name:string){
        let res = await this.ChatRepository.findOneBy({
            id: id
        });
        res.name = name;
        await this.ChatRepository.save(res);
        return (res);
    }

    async mouvIsSecreteChatById(id:number, isSecrete:boolean){
        let res = await this.ChatRepository.findOneBy({
            id: id
        });
        res.isSecrete = isSecrete;
        await this.ChatRepository.save(res);
        return (res);
    }

    async mouvIsDirectConvChatById(id:number, isDirectConv:boolean){
        let res = await this.ChatRepository.findOneBy({
            id: id
        });
        res.isDirectConv = isDirectConv;
        await this.ChatRepository.save(res);
        return (res);
    }

    async mouvPasswordChatById(id:number, password:string){
        let res = await this.ChatRepository.findOneBy({
            id: id
        });
        res.password = password;
        await this.ChatRepository.save(res);
        return (res);
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@ fin mouv @@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@ deb insert @@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    async insertChat(name, isSecrete, isDirectConv, password){
        let res = new Chat();
        res.name = name;
        res.isSecrete = isSecrete;
        res.isDirectConv = isDirectConv;
        res.password = password;
        await this.ChatRepository.save(res);
        return (res);
    }

    async insertChatUser(chatId:number, userId:number)
    {
        let chatUser = new ChatUser();
        chatUser.chatId = chatId;
        chatUser.userId = userId;
        await this.ChatUserRepository.save(chatUser);
        return (chatUser);
    }

    async insertChatAdmin(chatId:number, adminId:number)
    {
        let chatUser = new ChatAdmin();
        chatUser.chatId = chatId;
        chatUser.adminId = adminId;
        await this.ChatAdminRepository.save(chatUser);
        return (chatUser);
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@ fin insert @@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@ deb delete @@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    async deleteChat(id:number)
    {
        let res = await this.ChatRepository.findOneBy({
            id : id
        })
        await this.ChatRepository.save(res);
    }

    async deletChatAdminByAdminId(adminId:number)
    {
        let res = await this.ChatAdminRepository.findOneBy({
            adminId: adminId
        })
        await this.ChatAdminRepository.remove(res);
    }
    async deletChatUserByUserId(userId:number)
    {
        let res = await this.ChatUserRepository.findOneBy({
            userId: userId
        })
        await this.ChatUserRepository.remove(res);
    }

    async deletChatUserByChatId(chatId:number)
    {
        let res = await this.ChatUserRepository.findOneBy({
            chatId: chatId
        })
        await this.ChatUserRepository.remove(res);
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@ fin delerte @@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
}