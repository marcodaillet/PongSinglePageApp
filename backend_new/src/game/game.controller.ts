import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { Games} from './game.entity';
import { GameService } from './game.service';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GamePlay } from './backendGame';

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
    constructor() {}
    @Get()
    async all(){
    }
}   