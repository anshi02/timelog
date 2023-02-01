import Project from '../../projects/entities/project.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Room from './room.entity';

@Entity('room_types')
export default class RoomType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @ManyToOne(() => Project, (project) => project.roomTypes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    project: Project;

    @OneToMany(() => Room, (room) => room.type)
    rooms: Room[];
}
