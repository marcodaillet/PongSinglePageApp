import { Controller, Get, Post, Body} from '@nestjs/common';
import { diskStorage } from 'multer';
import { GameService } from './game.service';

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
            tmp.winner = 0;
            this.gameService.GamesRepository.save(tmp);
        }
    }
}
