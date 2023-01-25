import { Module } from '@nestjs/common';
import { configModule } from './moduleConfig/config';
import { typeormModule } from './moduleConfig/typeorm';
import User from './users/entities/user.entity';
import UserProfile from './users/entities/user-profile.entity';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { SubjectsModule } from './subjects/subjects.module';
import Project from './projects/entities/project.entity';
import Subject from './subjects/entities/subject.entity';
import Room from './rooms/entities/room.entity';
import Department from './departments/entities/department.entity';
import { RoomsModule } from './rooms/rooms.module';
import { DepartmentsModule } from './departments/departments.module';
import { SchedulesModule } from './schedules/schedules.module';
import { FacultiesModule } from './faculties/faculties.module';
import { DivisionsModule } from './divisions/divisions.module';
import { TimeSlotsModule } from './time-slots/time-slots.module';
import { LecturesModule } from './lectures/lectures.module';
import Faculty from './faculties/entities/faculty.entity';
import RoomType from './rooms/entities/room-type.entity';
import Division from './divisions/entities/division.entity';
import Schedule from './schedules/entities/schedule.entity';
import Lecture from './lectures/entities/lecture.entity';
import TimeSlot from './time-slots/entities/time-slot.entity';

@Module({
    imports: [
        configModule,
        typeormModule([
            User,
            UserProfile,
            Project,
            Subject,
            Room,
            RoomType,
            Department,
            Schedule,
            Faculty,
            Division,
            TimeSlot,
            Lecture,
        ]),
        UsersModule,
        ProjectsModule,
        SubjectsModule,
        RoomsModule,
        DepartmentsModule,
        SchedulesModule,
        FacultiesModule,
        DivisionsModule,
        TimeSlotsModule,
        LecturesModule,
    ],
})
export class AppModule {}
