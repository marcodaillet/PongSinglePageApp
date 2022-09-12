import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Chat} from './chat.entity';
import { ChatService } from './chat.service';
import { UserService } from './../user/user.service';
import { diskStorage } from 'multer';
import { User } from 'src/user/user.entity';
import { verifyUser } from './../user/authentication/intra-auth'


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
        private userService: UserService,
    ) {}

    @UseGuards(verifyUser)
    @Post('getChansByUserId')
    async takeChat(@Body() data) {
        let res: Chat[] = [];
        let chatUser = await this.chatService.getChatUserByUserId(data.userId)
        for (let i = 0; chatUser[i]; i++)
        {
            res.push(await this.chatService.getChatById(chatUser[i]));
        }
        return (res);
    }

    @UseGuards(verifyUser)
    @Post('getChanUsers')
    async getChanUsers(@Body() data){
        let res: User[] = [];
        let chatUser = await this.chatService.getChatUserByChatId(data.chanId)
        for (let i = 0; chatUser[i]; i++)
        {
            let user = await this.userService.findOne(chatUser[i]);
            user.userType = await this.chatService.getUserType(data.chanId, chatUser[i]);
            res.push(user);
        }
        return (res);
    }

    @UseGuards(verifyUser)
    @Post('newChan')
    async createNewChan(@Body() data){
        const spec = JSON.parse(JSON.stringify(data));
        let newChan = await this.chatService.insertChat(spec.name, spec.isPrivate, spec.isDirectConv, spec.password);
        this.chatService.insertChatUser(newChan.id, spec.adminId, 0);
        spec.users.forEach((user: User) => {
            if (user.id !== spec.adminId)
                this.chatService.insertChatUser(newChan.id, user.id, 1);
        });
    }

    @UseGuards(verifyUser)
    @Post('getChanById')
    async getChanById(@Body() data) {
        return await this.chatService.getChatById(data.chanId);
    }

    @UseGuards(verifyUser)
    @Post('getUserType')
    async getUserType(@Body() body) {
        let ret = await this.chatService.getUserType(body.chanId, body.userId);
        return (ret);
    }

    @UseGuards(verifyUser)
    @Post('isAdmin')
    async isAdmin(@Body() body) {
        let ret = await this.chatService.getUserType(body.chanId, body.userId);
        if (ret === 0)
            return (true)
        else
            return (false);
    }

    @UseGuards(verifyUser)
    @Post('isMuted')
    async isMuted(@Body() body) {
        let ret = await this.chatService.getUserType(body.chanId, body.userId);
        if (ret === 2)
            return (true)
        else
            return (false);
    }

    @UseGuards(verifyUser)
    @Post('isBanned')
    async isBanned(@Body() body) {
        let ret = await this.chatService.getUserType(body.chanId, body.userId);
        if (ret === 3)
            return (true)
        else
            return (false);
    }

    @UseGuards(verifyUser)
    @Post('addUser')
    async addUser(@Body() body) {
        let ret = await this.chatService.addUser(body.chanId, body.userId);
        return (ret);
    }

    @UseGuards(verifyUser)
    @Post('deleteUser')
    async deleteUser(@Body() body) {
        let ret = await this.chatService.deleteUserFromChat(body.chanId, body.userId);
        return (ret);
    }

    @UseGuards(verifyUser)
    @Post('updateUserStatus')
    async updateUserStatus(@Body() body) {
        let ret = await this.chatService.updateUserStatus(body.userId, body.status, body.chanId);
        return (ret);
    }

    @UseGuards(verifyUser)
    @Post('changePassword')
    async changePassword(@Body() body) {
        let ret = await this.chatService.mouvPasswordChatById(body.chanId, body.newPassword);
        if (body.newPassword === "")
            await this.chatService.mouvIsPrivateChatById(body.chanId,false)
        else
            await this.chatService.mouvIsPrivateChatById(body.chanId,true)
        return (ret);
    }

    @UseGuards(verifyUser)
    @Post('checkPassword')
    async checkPassword(@Body() body) {
        let ret = await this.chatService.checkPassword(body.chanId, body.password);
        return (ret);
    }

    @UseGuards(verifyUser)
    @Get('all')
    async getAllChans() {
        let ret = await this.chatService.getChat();
        return ret;
    }
}