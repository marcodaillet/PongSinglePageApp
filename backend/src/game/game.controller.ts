import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';

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