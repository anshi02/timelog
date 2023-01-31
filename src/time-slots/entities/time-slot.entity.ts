import Lecture from '../../lectures/entities/lecture.entity';
import Project from '../../projects/entities/project.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

export enum Day {
    MONDAY = 0,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY,
}

@Entity('time_slots')
export default class TimeSlot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ width: 4 })
    startMinutes: number;

    @Column({ width: 4 })
    endMinutes: number;

    @Column({ type: 'enum', enum: Day })
    day: Day;

    @ManyToOne(() => Project, (project) => project.timeSlots)
    @JoinColumn()
    project: Project;

    @OneToMany(() => Lecture, (lecture) => lecture.timeSlot, {
        onDelete: 'CASCADE',
    })
    lectures: Lecture[];
}
