import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import UserProfile from 'src/user-profiles/entities/user-profile.entity';
import Project from 'src/projects/entities/project.entity';
import Subject from 'src/subjects/entities/subject.entity';
import Room from 'src/rooms/entities/room.entity';
import RoomType from 'src/rooms/entities/room-type.entity';
import Department from 'src/departments/entities/department.entity';
import Schedule from 'src/schedules/entities/schedule.entity';
import Faculty from 'src/faculties/entities/faculty.entity';
import Division from 'src/divisions/entities/division.entity';
import TimeSlot from 'src/time-slots/entities/time-slot.entity';
import Lecture from 'src/lectures/entities/lecture.entity';

const entities: TypeOrmModuleOptions['entities'] = [
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
];

export const typeormModule = TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
        type: 'mysql' as const,

        host: configService.get<string>('db.hostname'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.databaseName'),
        synchronize: true,
        connectTimeout: configService.get<number>('db.timeoutMillis'),
        entities,
    }),
});
