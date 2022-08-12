import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { Chat, ChatAdmin, ChatUser} from './chat.entity';
import { ChatService } from './chat.service';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { User } from 'src/user/user.entity';

export const storage = { 
    storage: diskStorage({
        destination: './media',
        filename(_, file, cb) {
                return cb(null, `${file.originalname}`)
        }
    })
};

@Controller('chat')
export class ChatController {
    constructor(
        private chatService: ChatService,
    ) {}

    @Post('getChansByUserId')
    async takeChat(@Body() data) {
        let res: Chat[];
        let chatUser = await this.chatService.takeChatUserByUserId(data.userId)
        for (let i = 1; chatUser[i]; i++)
        {
            res.push(await this.chatService.takeChatById(chatUser[i].chatId));
        }
        return (res);
    }

    @Post('getChanUsers')
    async getChanUsers(@Body() data){
        let res: Chat[];
        let chatUser = await this.chatService.takeChatUserByChatId(data.chatId)
        for (let i = 0; chatUser[i]; i++)
        {
            res.push(await this.chatService.takeChatById(chatUser[i].chatId));
        }
        return (res);
    }

    @Post('newChan')
    async createNewChan(@Body() data){
        const spec = JSON.parse(JSON.stringify(data));
        let newChan = await this.chatService.insertChat(spec.name, spec.isPrivate, spec.isDirectConv, spec.password);
        spec.users.forEach((user: User) => {
            this.chatService.insertChatUser(newChan.id, user.id);
        });
        this.chatService.insertChatAdmin(newChan.id, data.adminId);
    }

    @Post('getChanById')
    async getChanById(@Body() data) {
        return await this.chatService.takeChatById(data.chanId);
    }

    @Post('isAdmin')
    async isAdmin(@Body() body) {
        let data = await this.chatService.takeChatAdminByChatId(body.chanId);
        data.forEach((user: User) => {
            if (user.id === body.userId)
                return (true);
        })
        return (false);
    }
}   