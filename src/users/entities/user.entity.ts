import { Exclude } from 'class-transformer';
import Faculty from '../../faculties/entities/faculty.entity';
import Project from '../../projects/entities/project.entity';
import UserProfile from '../../user-profiles/entities/user-profile.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 254, unique: true })
    email: string;

    @Column({ length: 60 })
    @Exclude()
    passwordHash: string;

    @OneToOne(() => UserProfile, (profile) => profile.user)
    @JoinColumn()
    profile: UserProfile;

    @OneToMany(() => Project, (project) => project.owner)
    projects: Project[];

    @OneToMany(() => Faculty, (faculty) => faculty.user)
    faculties: Faculty[];
}
