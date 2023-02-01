import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import User from './entities/user.entity';
import { UserExistsException, UserNotFoundException } from './users.exception';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) {}

    fetchPaginated(page: number, limit: number) {
        return this.usersRepo.findAndCount({ skip: page * limit, take: limit });
    }

    async fetchOne(id: number) {
        const user = await this.usersRepo.findOneBy({ id });
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return user;
    }

    async fetchOneByEmail(email: string) {
        const user = await this.usersRepo.findOneBy({ email });
        if (!user) {
            throw new UserNotFoundException(email);
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
        user.passwordHash = await this.authService.generateHash(
            userDto.password,
        );
        return this.usersRepo.save(user);
    }

    async update(id: number, { password }: UpdateUserDto) {
        const user = await this.fetchOne(id);
        user.passwordHash = await this.authService.generateHash(password);
        return this.usersRepo.save(user);
    }

    async delete(id: number) {
        const user = await this.fetchOne(id);
        this.usersRepo.delete({ id: user.id });
    }
}
