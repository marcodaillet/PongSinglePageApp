import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User} from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from './authentication/models/constants'
import { AuthService } from './authentication/authentication.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConst.secret,
      signOptions: { expiresIn: '1d'},
    }), ],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
