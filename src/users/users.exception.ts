import { ConflictException, NotFoundException } from '@nestjs/common';
import User from './entities/user.entity';

export class UserNotFoundException extends NotFoundException {
    constructor(userId: number);
    constructor(userEmail: string);
    constructor(field: number | string) {
        if (typeof field === 'number') {
            super(`user with id ${field} does not exist`, {
                description: 'UserNotFoundException',
            });
        } else {
            super(`user with email ${field} does not exist`, {
                description: 'UserNotFoundException',
            });
        }
    }
}

export class UserExistsException extends ConflictException {
    constructor(user: User) {
        super(`user with email ${user.email} already exists`, {
            description: 'UserExistsException',
        });
    }
}
