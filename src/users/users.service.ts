import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import User from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserExistsException, UserNotFoundException } from './users.exception';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        private readonly configService: ConfigService,
    ) {}

    fetchPaginated(page: number, limit: number) {
        return this.usersRepo.findAndCount({ skip: page * limit, take: limit });
    }

    async generatePasswordHash(password: string) {
        const rounds = this.configService.getOrThrow<number>('auth.saltRounds');
        return bcrypt.hash(password, rounds);
    }

    async fetchOne(id: number) {
        const user = await this.usersRepo.findOneBy({ id });
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return user;
    }

    async create(userDto: CreateUserDto) {
        const existingUser = await this.usersRepo.findOneBy({
            email: userDto.email,
        });
        if (existingUser) {
            throw new UserExistsException(existingUser);
        }

        const user = this.usersRepo.create(userDto);
        user.passwordHash = await this.generatePasswordHash(userDto.password);
        return this.usersRepo.save(user);
    }

    async update(id: number, userDto: UpdateUserDto) {
        const user = await this.fetchOne(id);
        if (userDto.password) {
            user.passwordHash = await this.generatePasswordHash(
                userDto.password,
            );
        }
        return this.usersRepo.save(user);
    }
}
