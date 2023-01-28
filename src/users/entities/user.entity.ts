import { Exclude } from 'class-transformer';
import Faculty from 'src/faculties/entities/faculty.entity';
import Project from 'src/projects/entities/project.entity';
import UserProfile from 'src/user-profiles/entities/user-profile.entity';
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

    @OneToOne(() => UserProfile, (profile) => profile.user, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    profile: UserProfile;

    @OneToMany(() => Project, (project) => project.owner, {
        onDelete: 'CASCADE',
    })
    projects: Project[];

    @OneToMany(() => Faculty, (faculty) => faculty.user)
    faculties: Faculty[];
}
