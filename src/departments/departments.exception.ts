import { NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import Department from './entities/department.entity';

export class DepartmentNotFoundException extends NotFoundException {
    constructor(departmentId: number) {
        super(`department with id ${departmentId} does not exist`, {
            description: 'DepartmentNotFoundException',
        });
    }
}

export class DepartmentExistsException extends ConflictException {
    constructor(department: Department) {
        super(
            `department with name ${department.name} already exists with id ${department.id}`,
            { description: 'DepartmentExistsException' },
        );
    }
}
