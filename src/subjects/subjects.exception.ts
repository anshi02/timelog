import { NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import Subject from './entities/subject.entity';

export class SubjectNotFoundException extends NotFoundException {
    constructor(subjectId: number) {
        super(`subject with id ${subjectId} does not exist`, {
            description: 'SubjectNotFoundException',
        });
    }
}

export class SubjectExistsException extends ConflictException {
    constructor(subject: Subject) {
        super(
            `subject with name ${subject.name} already exists with id ${subject.id}`,
            { description: 'SubjectExistsException' },
        );
    }
}
