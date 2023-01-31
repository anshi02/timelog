import { Exclude } from 'class-transformer';
import Department from '../../departments/entities/department.entity';
import Division from '../../divisions/entities/division.entity';
import Faculty from '../../faculties/entities/faculty.entity';
import RoomType from '../../rooms/entities/room-type.entity';
import Schedule from '../../schedules/entities/schedule.entity';
import Subject from '../../subjects/entities/subject.entity';
import TimeSlot from '../../time-slots/entities/time-slot.entity';
import User from '../../users/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Unique(['owner', 'name'])
@Entity('projects')
export default class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @ManyToOne(() => User, (user) => user.projects)
    @JoinColumn()
    @Exclude()
    owner: User;

    @OneToMany(() => Subject, (subject) => subject.project, {
        onDelete: 'CASCADE',
    })
    subjects: Subject[];

    @OneToMany(() => Department, (department) => department.project, {
        onDelete: 'CASCADE',
    })
    departments: Department[];

    @OneToMany(() => Schedule, (schedule) => schedule.project, {
        onDelete: 'CASCADE',
    })
    schedules: Schedule[];

    @OneToMany(() => Faculty, (faculty) => faculty.project, {
        onDelete: 'CASCADE',
    })
    faculties: Faculty[];

    @OneToMany(() => RoomType, (roomType) => roomType.project, {
        onDelete: 'CASCADE',
    })
    roomTypes: RoomType[];

    @OneToMany(() => Division, (division) => division.project, {
        onDelete: 'CASCADE',
    })
    divisions: Division[];

    @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.project, {
        onDelete: 'CASCADE',
    })
    timeSlots: TimeSlot[];
}
