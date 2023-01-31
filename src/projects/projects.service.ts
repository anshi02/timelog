import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import CreateProjectDto from './dto/create-project.dto';
import UpdateProjectDto from './dto/update-project.dto';
import Project from './entities/project.entity';
import {
    ProjectExistsException,
    ProjectNotFoundException,
} from './projects.exception';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectsRepo: Repository<Project>,
        private readonly usersService: UsersService,
    ) {}

    async fetchPaginated(ownerId: number, limit: number, page: number) {
        return this.projectsRepo.findAndCount({
            skip: page * limit,
            take: limit,
            where: { owner: { id: ownerId } },
        });
    }

    // TODO: work on this @aniket-kr
    // async fetchDetailedPaginated(ownerId: number, limit: number, page: number) {
    // }

    async fetchOne(projectId: number) {
        const project = await this.projectsRepo.findOneBy({ id: projectId });
        if (!project) {
            throw new ProjectNotFoundException(projectId);
        }
        return project;
    }

    async create(userId: number, projectDto: CreateProjectDto) {
        const condition = { owner: { id: userId }, name: projectDto.name };
        const existing = await this.projectsRepo.findOneBy(condition);
        if (existing) {
            throw new ProjectExistsException(existing);
        }

        const project = this.projectsRepo.create(projectDto);
        await project.owner;
        project.owner = await this.usersService.fetchOne(userId);
        return this.projectsRepo.save(project);
    }

    async update(
        userId: number,
        projectId: number,
        projectDto: UpdateProjectDto,
    ) {
        const where = { id: projectId, owner: { id: userId } };
        const belongsToUser = await this.projectsRepo.exist({ where });
        if (!belongsToUser) {
            throw new ProjectNotFoundException(projectId);
        }
        await this.projectsRepo.update({ id: projectId }, projectDto);
        return this.fetchOne(projectId);
    }
}
