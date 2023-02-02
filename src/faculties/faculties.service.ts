import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateFacultyDto from './dto/create-faculty.dto';
import UpdateFacultyDto from './dto/update-faculty.dto';
import Faculty from './entities/faculty.entity';
import {
    FacultyExistsException,
    FacultyNotFoundException,
} from './faculties.exception';

@Injectable()
export class FacultyService {
    constructor(
        @InjectRepository(Faculty)
        private readonly facultyRepo: Repository<Faculty>,
    ) {}

    // TODO: work on this @aniket-kr
    // async fetchDetailedPaginated(ownerId: number, limit: number, page: number) {
    // }

    async fetchOne(facultyId: number) {
        const faculty = await this.facultyRepo.findOneBy({
            id: facultyId,
        });
        if (!faculty) {
            throw new FacultyNotFoundException(facultyId);
        }
        return faculty;
    }

    async create(projectId: number, facultyDto: CreateFacultyDto) {
        const condition = {
            project: { id: projectId },
            code: facultyDto.code,
        };
        const existing = await this.facultyRepo.findOneBy(condition);
        if (existing) {
            throw new FacultyExistsException(existing);
        }

        const faculty = this.facultyRepo.create(facultyDto);
        await faculty.project;
        return this.facultyRepo.save(faculty);
    }

    async update(
        userId: number,
        facultyId: number,
        facultyDto: UpdateFacultyDto,
    ) {
        const where = { id: facultyId, project: { id: userId } };
        const belongsToUser = await this.facultyRepo.exist({ where });
        if (!belongsToUser) {
            throw new FacultyNotFoundException(facultyId);
        }
        await this.facultyRepo.update({ id: facultyId }, facultyDto);
        return this.fetchOne(facultyId);
    }
}
