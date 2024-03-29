import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user.module";
import { AuthController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { IntraStrategy } from "./intra-auth";
import { jwtConst } from "./models/constants";

@Module({
    imports: [
        UserModule,
        HttpModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConst.secret,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthenticationService, IntraStrategy],
    exports: [AuthenticationService],
})
export class AuthModule {}