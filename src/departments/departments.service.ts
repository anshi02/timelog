import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateDepartmentDto from './dto/create-department.dto';
import UpdateDepartmentDto from './dto/update-department.dto';
import Department from './entities/department.entity';
import {
    DepartmentExistsException,
    DepartmentNotFoundException,
} from './departments.exception';

@Injectable()
export class DepartmentsService {
    constructor(
        @InjectRepository(Department)
        private readonly departmentsRepo: Repository<Department>,
    ) {}

    async fetchPaginated(projectId: number, limit: number, page: number) {
        return this.departmentsRepo.findAndCount({
            skip: page * limit,
            take: limit,
            where: { project: { id: projectId } },
        });
    }

    // TODO: work on this @aniket-kr
    // async fetchDetailedPaginated(ownerId: number, limit: number, page: number) {
    // }

    async fetchOne(departmentId: number) {
        const department = await this.departmentsRepo.findOneBy({
            id: departmentId,
        });
        if (!department) {
            throw new DepartmentNotFoundException(departmentId);
        }
        return department;
    }

    async create(projectId: number, departmentDto: CreateDepartmentDto) {
        const condition = {
            project: { id: projectId },
            name: departmentDto.name,
        };
        const existing = await this.departmentsRepo.findOneBy(condition);
        if (existing) {
            throw new DepartmentExistsException(existing);
        }

        const department = this.departmentsRepo.create(departmentDto);
        await department.project;
        return this.departmentsRepo.save(department);
    }

    async update(
        userId: number,
        departmentId: number,
        departmentDto: UpdateDepartmentDto,
    ) {
        const where = { id: departmentId, project: { id: userId } };
        const belongsToUser = await this.departmentsRepo.exist({ where });
        if (!belongsToUser) {
            throw new DepartmentNotFoundException(departmentId);
        }
        await this.departmentsRepo.update({ id: departmentId }, departmentDto);
        return this.fetchOne(departmentId);
    }
}
