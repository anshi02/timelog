import Subject from 'src/subjects/entities/subject.entity';
import TimeSlot from 'src/time-slots/entities/time-slot';
import User from 'src/users/entities/user.entity';
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
    owner: User;

    @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.project, {
        onDelete: 'CASCADE',
    })
    timeSlots: TimeSlot[];

    @OneToMany(() => Subject, (subject) => subject.project, {
        onDelete: 'CASCADE',
    })
    subjects: Subject[];
}
