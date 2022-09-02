import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../user/user.entity';
import { Games, Balls, Raquettes, Historique } from './game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Games, Balls, Raquettes, Historique, User]),
  ],
  providers: [GameService],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {}
