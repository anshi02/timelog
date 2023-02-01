import User from '../../users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_profiles')
export default class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 100, nullable: true })
    lastName: string;

    @Column({ length: 1000, nullable: true })
    bio: string;

    @Column({ length: 320, nullable: true })
    picPath: string;

    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    user: User;
}
