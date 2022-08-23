import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, ChatUser } from './chat.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { jwtConst } from '../user/authentication/models/constants'
import { AuthenticationService } from '../user/authentication/authentication.service';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, ChatUser]),
    UserModule,
    JwtModule.register({
      signOptions: { expiresIn: '1d'},
      secret: jwtConst.secret,
    }),
  ],
  providers: [ChatService, AuthenticationService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
