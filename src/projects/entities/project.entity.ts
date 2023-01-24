import User from 'src/users/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
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
}
