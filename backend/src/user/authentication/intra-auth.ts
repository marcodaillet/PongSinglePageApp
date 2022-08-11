import { HttpService } from "@nestjs/axios"
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-oauth2"
import { stringify } from "querystring"
import { AuthService } from "./authentication.service"

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy, 'intra') {
    constructor (
        private authService: AuthService,
        private jwtService : JwtService,
        private http: HttpService
    ) {
        super({
            authorizationURL: `https://api.intra.42.fr/oauth/authorize?${ stringify({client_id : process.env.API42_UID, redirect_uri : 'http://localhost:3000/api/authentication/login', scope : 'public', state : process.env.STATE, response_type :'code',}) }`,
            tokenURL : 'https://api.intra.42.fr/oauth/token', clientID : process.env.API42_UID, clientSecret : process.env.API42_SECRET, callbackURL : 'http://localhost:3000/api/authentication/login', scope : 'public',
        });
    }

    async validate(accessToken: string): Promise<any> {
        const data = await this.http.get('https://api.intra.42.fr/v2/me', { headers: { Authorization: `Bearer ${ accessToken }` },}).toPromise();
        const jwt = await this.jwtService.signAsync({id: data.data.id});
        return jwt;
    }
}

@Injectable()
export class verifyUser implements CanActivate {
    constructor(private jwtService: JwtService) {}
    
    canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
        try {
            const jwt = req.cookies['clientID'];
            return this.jwtService.verify(jwt);
        }
        catch (error) {
            throw new UnauthorizedException('unauthorized');
        }
    }
}