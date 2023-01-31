import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import { UserNotFoundException } from '../users/users.exception';
import { Repository } from 'typeorm';
import CreateUserProfileDto from './dto/create-user-profile.dto';
import UpdateUserProfileDto from './dto/update-user-profile.dto';
import UserProfile from './entities/user-profile.entity';
import {
    UserProfileExistsException,
    UserProfileNotFoundException,
} from './user-profiles.exception';

@Injectable()
export class UserProfilesService {
    constructor(
        @InjectRepository(UserProfile)
        private readonly profilesRepo: Repository<UserProfile>,
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
    ) {}

    async fetchForUser(userId: number) {
        const user = await this.usersRepo.findOneBy({ id: userId });
        if (!user) {
            throw new UserNotFoundException(userId);
        } else if (!(await user.profile)) {
            throw new UserProfileNotFoundException({ userId });
        }
        return user.profile;
    }

    async create(userId: number, profileDto: CreateUserProfileDto) {
        const user = await this.usersRepo.findOneBy({ id: userId });
        if (!user) {
            throw new UserNotFoundException(userId);
        } else if (await user.profile) {
            throw new UserProfileExistsException(user.profile);
        }
        let profile = this.profilesRepo.create(profileDto);
        user.profile = profile;
        profile = await this.profilesRepo.save(profile);
        this.usersRepo.save(user);
        return profile;
    }

    async update(userId: number, profileDto: UpdateUserProfileDto) {
        const profile = await this.profilesRepo.findOneBy({
            user: { id: userId },
        });
        if (!profile) {
            throw new UserProfileNotFoundException({ userId });
        }

        return this.profilesRepo.update(
            { user: { id: userId } },
            { ...profileDto },
        );
    }
}
