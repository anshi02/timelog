import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import User from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async generateHash(password: string) {
        const rounds = this.configService.getOrThrow<number>('auth.saltRounds');
        return bcrypt.hash(password, rounds);
    }

    async isValidPassword(password: string, encrpyted: string) {
        return bcrypt.compare(password, encrpyted);
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.fetchOneByEmail(email);
        return (await this.isValidPassword(password, user.passwordHash))
            ? user
            : null;
    }

    getSignedJwt(user: User) {
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload);
    }
}
