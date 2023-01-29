import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import UserProfile from './entities/user-profile.entity';
import { UserProfilesController } from './user-profiles.controller';
import { UserProfilesService } from './user-profiles.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserProfile, User])],
    controllers: [UserProfilesController],
    providers: [UserProfilesService],
})
export class UserProfilesModule {}
