import { Body, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { authenticator } from "otplib";
import path, { join } from "path";
import { UserService } from "../user.service";
import { RegisterModel, UpdateModel } from "./models/models";

const QRCode = require('qrcode');

@Injectable()
export class AuthenticationService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async generateTwoFactorAuthSecret(id: number) {
        const client = await this.userService.findOne(id);
        const secret = authenticator.generateSecret();
        await this.userService.setTwoFactorSecret(secret, id);
        return authenticator.keyuri(client.email, 'mdaillet\'s ft_transcendence', secret);
    }

    async createQRImage(url: string) {
        var QR = require('qrcode');
        const dataUrl = await QR.toDataURL(url);
        return dataUrl;
    }

    async verifyTwoFactorSecret(code: string, id: number) {
        const client = await this.userService.findOne(id);
        const ret = authenticator.verify({token: code, secret: client.twoFactorSecret})
        return ret
    }

    async clientID(request: Request): Promise<number> {
        const cookie = request.cookies['clientID'];
        const data = await this.jwtService.verifyAsync(cookie);
        return data['id'];
    }

    async newUser(@Body() data: RegisterModel, clientID: number) {
        data.avatar = 'http://localhost:3000/api/user/media/DefaultAvatar.png';
        data.id = clientID;
        data.twofa = false;
        data.pendingInvite = false;
        data.status = 'ONLINE';
        data.twoFactorSecret = '';
        data.privateGame = -1;
        data.privatePartner = -1;
        await this.userService.create(data);
    }

    async updateUser(@Body() data: UpdateModel) {
        await this.userService.update(data.id, data);
    }
}