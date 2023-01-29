import { ConflictException, NotFoundException } from '@nestjs/common';
import UserProfile from './entities/user-profile.entity';

export type UserProfileNotFoundExceptionOptions =
    | { userId: number; profileId?: undefined }
    | { profileId: number; userId?: undefined };

export class UserProfileNotFoundException extends NotFoundException {
    constructor(options: UserProfileNotFoundExceptionOptions) {
        const { userId, profileId } = options;
        if (userId) {
            super(`user profile for user with id ${userId} does not exist`, {
                description: 'UserProfileNotFoundException',
            });
        } else if (profileId) {
            super(`user profile with id ${profileId} does not exist`, {
                description: 'UserProfileNotFoundException',
            });
        }
    }
}

export class UserProfileExistsException extends ConflictException {
    constructor(profile: UserProfile) {
        super(`profile id ${profile.id} already exists`, {
            description: 'UserProfileExistsException',
        });
    }
}
