import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Faculties from './entities/faculty.entity';
import { FacultyController } from './faculties.controller';
import { FacultyService } from './faculties.service';

@Module({
    imports: [TypeOrmModule.forFeature([Faculties])],
    controllers: [FacultyController],
    providers: [FacultyService],
})
export class FacultiesModule {}
