import { IsAlpha, IsEmail, IsNotEmpty, IsPhoneNumber, Length } from "class-validator";

export class RegisterModel {
    id: number;
    avatar: string;
    @Length(3, 15)
    @IsNotEmpty()
    @IsAlpha()
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsPhoneNumber('FR')
    phoneNumber: string;
    twofa: boolean;
    pendingInvite: boolean;
    status: string;
    twoFactorSecret?: string;
    privateGame: number;
    privatePartner: number;
}

export class UpdateModel {
    id: number;
    avatar: string;
    @Length(3, 15)
    @IsNotEmpty()
    @IsAlpha()
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsPhoneNumber('FR')
    phoneNumber: string;
    twofa: boolean;
    twoFactorSecret?: string;
    privateGame: number;
    privatePartner: number;
}