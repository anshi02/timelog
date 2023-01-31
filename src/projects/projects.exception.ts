import { NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import Project from './entities/project.entity';

export class ProjectNotFoundException extends NotFoundException {
    constructor(projectId: number) {
        super(`project with id ${projectId} does not exist`, {
            description: 'ProjectNotFoundException',
        });
    }
}

export class ProjectExistsException extends ConflictException {
    constructor(project: Project) {
        super(
            `project with name ${project.name} already exists with id ${project.id}`,
            { description: 'ProjectExistsException' },
        );
    }
}
