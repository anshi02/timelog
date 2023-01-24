import { Module } from '@nestjs/common';
import { configModule } from './moduleConfig/config';
import { typeormModule } from './moduleConfig/typeorm';
import User from './users/entities/user.entity';
import UserProfile from './users/entities/userProfile.entity';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
    imports: [
        configModule,
        typeormModule([User, UserProfile]),
        UsersModule,
        ProjectsModule,
    ],
})
export class AppModule {}
