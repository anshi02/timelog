import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserToken } from '../contracts/user-token.contract';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('auth.jwtSecretKey'),
        });
    }

    validate(payload: { email: string; sub: number }): UserToken {
        const { sub: userId, email } = payload;
        return { userId, email };
    }
}
