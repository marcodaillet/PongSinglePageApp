import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages.entity';
import { UserModule } from './../../user/user.module';
import { AuthModule } from 'src/user/authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from 'src/user/authentication/models/constants';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { AuthenticationService } from 'src/user/authentication/authentication.service';

@Module({
    imports: [TypeOrmModule.forFeature([Message]),
        AuthModule,
        UserModule,
        JwtModule.register({
            signOptions: { expiresIn: '1d'},
            secret: jwtConst.secret,
        }),
    ],
    providers: [MessagesService, AuthenticationService],
    controllers: [MessagesController],
})
export class MessagesModule {}
