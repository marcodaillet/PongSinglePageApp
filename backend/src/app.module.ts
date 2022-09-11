import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './user/authentication/authentication.module';
import { MessagesModule } from './chat/messages/messages.module';
import { ChatGatewayModule } from './chat/chat.gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      
      // type: "postgres",
      // port: 5432,
      // host: "127.0.0.1",
      // username: "postgres",
      // password: "root",
      // database: "transandance",
      // autoLoadEntities: true,
      // synchronize: true,
    }),
    AuthModule,
    UserModule,
    GameModule,
    ChatModule,
    MessagesModule,
    ChatGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}