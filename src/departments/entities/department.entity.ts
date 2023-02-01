import Project from '../../projects/entities/project.entity';
import Room from '../../rooms/entities/room.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Unique(['project', 'name'])
@Entity('departments')
export default class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @ManyToOne(() => Project, (project) => project.departments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    project: Project;

    @OneToMany(() => Room, (room) => room.department)
    rooms: Room[];
}
