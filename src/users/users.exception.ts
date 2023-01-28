import { ConflictException, NotFoundException } from '@nestjs/common';
import User from './entities/user.entity';

export class UserNotFoundException extends NotFoundException {
    constructor(userId: number) {
        super(`user with id ${userId} does not exist`);
    }
}

export class UserExistsException extends ConflictException {
    constructor(user: User) {
        super(`user with email ${user.email} already exists`);
    }
}
