import { NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import Faculty from './entities/faculty.entity';

export class FacultyNotFoundException extends NotFoundException {
    constructor(facultyId: number) {
        super(`faculty with id ${facultyId} does not exist`, {
            description: 'FacultyNotFoundException',
        });
    }
}

export class FacultyExistsException extends ConflictException {
    constructor(faculty: Faculty) {
        super(
            `faculty with code ${faculty.code} already exists with id ${faculty.id}`,
            { description: 'FacultyExistsException' },
        );
    }
}
