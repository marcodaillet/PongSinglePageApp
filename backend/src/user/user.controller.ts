import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { verifyUser } from './authentication/intra-auth'
import { AuthenticationService } from './authentication/authentication.service';
import { User } from './user.entity';
import { UserService } from './user.service';
import { RegisterModel } from './authentication/models/models';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const storage = { 
    storage: diskStorage({
        destination: './media',
        filename(_, file, cb) {
                return cb(null, `${file.originalname}`)
        }
    })
};

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
    ) {}

    @UseGuards(verifyUser)
    @Get("all")
    async all(): Promise<User[]> {
        return await this.userService.all();
    }

    @UseGuards(verifyUser)
    @Get("findUserById:id")
    async findUserById(@Param('id') id) {
        return await this.userService.findOne(id);
    }

    @UseGuards(verifyUser)
    @Post("getUser")
    async getUserName(@Body() body): Promise<User> {
        let user = await this.userService.findOne(body.id);
        return user;
    }

    @UseGuards(verifyUser)
    @Get("findUser:username")
    async findUser(@Param('username') username): Promise<User> {
        return await this.userService.findUserByName(username);
    }

    @UseGuards(verifyUser)
    @Post("updateUser")
    async updateUser(@Req() request: Request, @Body() data: RegisterModel) {
        const user = await this.authenticationService.clientID(request);
        await this.userService.update(user, data);
    }

    @UseGuards(verifyUser)
    @Post("setInStatus")
    async setInStatus(@Req() request: Request) {
        const user = await this.authenticationService.clientID(request);
        await this.userService.setInGame(user);
    }


    @UseGuards(verifyUser)
    @Post("setOnStatus")
    async setOnStatus(@Req() request: Request) {
        const user = await this.authenticationService.clientID(request);
        await this.userService.setOnline(user);
    }

    @UseGuards(verifyUser)
    @Get("getUserId")
    async getUserId(@Req() request: Request) {
        const id = await this.authenticationService.clientID(request);
        return { userId: id };
    }

    @UseGuards(verifyUser)
    @Get("allFriends")
    async allFriends(): Promise<User[]> {
        return await this.userService.allFriends();
    }

    @UseGuards(verifyUser)
    @Get("userFriends")
    async userFriends(@Req() request: Request): Promise<User> {
        const id = await this.authenticationService.clientID(request);
        return await this.userService.userFriends(id);
    }

    @UseGuards(verifyUser)
    @Get("userBlocked")
    async userBlocked(@Req() request: Request): Promise<User> {
        const id = await this.authenticationService.clientID(request);
        return await this.userService.userBlocked(id);
    }

    @UseGuards(verifyUser)
    @Post("blockUser")
    async blockUser(@Body() body) {
        await this.userService.blockUser(body.userId, body.blockeeId);
    }

    @UseGuards(verifyUser)
    @Post("unBlockUser")
    async unBlockUser(@Body() body) {
        await this.userService.unBlockUser(body.userId, body.blockeeId);
    }

    @UseGuards(verifyUser)
    @Post("addFriend")
    async addFriend(@Body() body): Promise<User[]> {
        const data = JSON.parse(JSON.stringify(body));
        const userID = data.userID;
        const friendID = data.friendID;
        return await this.userService.addFriend(userID, friendID);
    }
  
    @UseGuards(verifyUser)
    @Post("deleteFriend")
    async deleteFriend(@Body() body): Promise<User[]> {
        const data = JSON.parse(JSON.stringify(body));
        const userID = data.userID;
        const friendID = data.friendID;
        return await this.userService.deleteFriend(userID, friendID);
    }

    @UseGuards(verifyUser)
    @Post('uploadImage')
    @UseInterceptors(FileInterceptor('avatar', storage))
    uploadFile(@UploadedFile() avatar, @Req() request: Request): Observable<Object> {
        return of({url: `http://localhost:3000/api/user/media/${avatar.filename}`})
    }

    @Get('media/:avatar')
    findAvatar(@Param('avatar') avatar, @Res() res): Observable<Object> {
        return of(res.sendFile(avatar, {root: 'media'}));
    }

    @UseGuards(verifyUser)
    @Post("sendGameInvite")
    async sendGameInvite(@Body() body) {
        const data = JSON.parse(JSON.stringify(body));
        const userID = data.userID;
        const gameID = data.gameID;
        await this.userService.sendGameInvite(userID, gameID);
    }

    @UseGuards(verifyUser)
    @Post("sendUserInvite")
    async sendUserInvite(@Body() body) {
        const data = JSON.parse(JSON.stringify(body));
        const userID = data.userID;
        const userInviteID = data.userInviteID;
        await this.userService.sendGameInvite2(userID, userInviteID);
    }
}