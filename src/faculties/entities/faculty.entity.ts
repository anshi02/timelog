import Lecture from '../../lectures/entities/lecture.entity';
import Project from '../../projects/entities/project.entity';
import Subject from '../../subjects/entities/subject.entity';
import User from '../../users/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Unique(['project', 'code', 'user'])
@Entity('faculties')
export default class Faculty {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project) => project.faculties)
    @JoinColumn()
    project: Project;

    @Column({ length: 10 })
    code: string;

    @ManyToOne(() => User, (user) => user.faculties)
    @JoinColumn()
    user: User;

    @OneToMany(() => Lecture, (lecture) => lecture.faculty, {
        onDelete: 'CASCADE',
    })
    lectures: Lecture[];

    @ManyToMany(() => Subject, (subject) => subject.faculties, {
        orphanedRowAction: 'delete',
    })
    subjects: Subject[];
}
