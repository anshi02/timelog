import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import UserProfile from './userProfile.entity';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 254, unique: true })
    email: string;

    @Column({ length: 512 })
    passwordHash: string;

    @Column({ length: 8 })
    passwordSalt: string;

    @OneToOne(() => UserProfile, (profile) => profile.user, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    profile: UserProfile;
}
