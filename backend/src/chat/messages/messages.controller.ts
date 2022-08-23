import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { verifyUser } from 'src/user/authentication/intra-auth';
import { Message, MessageModel } from './messages.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(
        private messagesService: MessagesService
    ) {}

    @UseGuards(verifyUser)
    @Get('all')
    async all(): Promise<Message[]> {
        return await this.messagesService.all();
    }

    @UseGuards(verifyUser)
    @Post('newMessage')
    async newMessage(@Body() data: MessageModel) {
        return await this.messagesService.createChanMessage(data);
    }

    @UseGuards(verifyUser)
    @Post('getOldMessages')
    async getChanOldMessages(@Body() body): Promise<Message[]> {
        return await this.messagesService.findChanMessages(body.chanId);
    }
}
