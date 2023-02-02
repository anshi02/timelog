import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateSubjectDto from './dto/create-subject.dto';
import UpdateSubjectDto from './dto/update-subject.dto';
import Subject from './entities/subject.entity';
import {
    SubjectExistsException,
    SubjectNotFoundException,
} from './subjects.exception';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(Subject)
        private readonly subjectsRepo: Repository<Subject>,
    ) {}

    async fetchPaginated(projectId: number, limit: number, page: number) {
        return this.subjectsRepo.findAndCount({
            skip: page * limit,
            take: limit,
            where: { project: { id: projectId } },
        });
    }

    // TODO: work on this @aniket-kr
    // async fetchDetailedPaginated(ownerId: number, limit: number, page: number) {
    // }

    async fetchOne(subjectId: number) {
        const subject = await this.subjectsRepo.findOneBy({
            id: subjectId,
        });
        if (!subject) {
            throw new SubjectNotFoundException(subjectId);
        }
        return subject;
    }

    async create(projectId: number, subjectDto: CreateSubjectDto) {
        const condition = {
            project: { id: projectId },
            name: subjectDto.name,
        };
        const existing = await this.subjectsRepo.findOneBy(condition);
        if (existing) {
            throw new SubjectExistsException(existing);
        }

        const subject = this.subjectsRepo.create(subjectDto);
        await subject.project;
        return this.subjectsRepo.save(subject);
    }

    async update(
        userId: number,
        subjectId: number,
        subjectDto: UpdateSubjectDto,
    ) {
        const where = { id: subjectId, project: { id: userId } };
        const belongsToUser = await this.subjectsRepo.exist({ where });
        if (!belongsToUser) {
            throw new SubjectNotFoundException(subjectId);
        }
        await this.subjectsRepo.update({ id: subjectId }, subjectDto);
        return this.fetchOne(subjectId);
    }
}
