import Faculty from 'src/faculties/entities/faculty.entity';
import Lecture from 'src/lectures/entities/lecture.entity';
import Project from 'src/projects/entities/project.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('subjects')
export default class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 10 })
    code: string;

    @Column({ length: 100 })
    name: string;

    @ManyToOne(() => Project, (project) => project.subjects)
    @JoinColumn()
    project: Project;

    @OneToMany(() => Lecture, (lecture) => lecture.subject, {
        onDelete: 'CASCADE',
    })
    lectures: Lecture[];

    @ManyToMany(() => Faculty, (faculty) => faculty.subjects, {
        orphanedRowAction: 'delete',
    })
    faculties: Faculty[];
}
