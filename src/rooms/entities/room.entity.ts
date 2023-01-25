import Department from 'src/departments/entities/department.entity';
import Lecture from 'src/lectures/entities/lecture.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import RoomType from './room-type.entity';

@Entity('rooms')
export default class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    code: string;

    @Column()
    capacity: number;

    @ManyToOne(() => Department, (department) => department.rooms)
    @JoinColumn()
    department: Department;

    @OneToMany(() => Lecture, (lecture) => lecture.room, {
        onDelete: 'CASCADE',
    })
    lectures: Lecture[];

    @ManyToOne(() => RoomType, (roomType) => roomType.rooms)
    @JoinColumn()
    type: RoomType;
}
