import { forwardRef, Injectable, Inject, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import CreateUserDto from '../users/dto/create-user.dto';
import UpdateUserDto from '../users/dto/update-user.dto';
import User from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
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

    getUser(userId: number) {
        return this.usersService.fetchOne(userId);
    }

    createUser(userDto: CreateUserDto) {
        return this.usersService.create(userDto);
    }

    updateUser(userId: number, @Body() userDto: UpdateUserDto) {
        return this.usersService.update(userId, userDto);
    }

    deleteUser(userId: number) {
        return this.usersService.delete(userId);
    }
}
