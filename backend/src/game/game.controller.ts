import { Controller, Get, Post, Body} from '@nestjs/common';
import { diskStorage } from 'multer';
import { GameService } from './game.service';
import { UserService } from './../user/user.service';

export const storage = { 
    storage: diskStorage({
        destination: './media',
        filename(_, file, cb) {
                return cb(null, `${file.originalname}`)
        }
    })
};

@Controller('game')
export class GameController {
    constructor(
        private readonly gameService: GameService,
    ) {}
    @Get()
    async all(){
    }

    @Get('getGameHistoric')
    async getGameHistoric() {
        return await this.gameService.getGameHistoric();
    }

    @Post('checkEnd')
    async getChanUsers(@Body() data){
        var tmp = await this.gameService.TakeGameByRaq(data.id);
        if (tmp)
        {
            if (tmp.raq2 === -1)
            {
                await this.gameService.delateGame(tmp);
                return ;
            }
            tmp.winner = 0;
            this.gameService.GamesRepository.save(tmp);
        }
    }

    @Post('spectateFriend')
    async spectateFriend(@Body() data){
        let tmp = await this.gameService.TakeGameByRaq(data.friendID);
        return tmp;
    }
}
