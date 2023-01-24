import { Module } from '@nestjs/common';
import { configModule } from './moduleConfig/config';
import { typeormModule } from './moduleConfig/typeorm';
import User from './users/entities/user.entity';
import UserProfile from './users/entities/user-profile.entity';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { SubjectsModule } from './subjects/subjects.module';
import Project from './projects/entities/project.entity';
import Subject from './subjects/entities/subject.entity';

@Module({
    imports: [
        configModule,
        typeormModule([User, UserProfile, Project, Subject]),
        UsersModule,
        ProjectsModule,
        SubjectsModule,
    ],
})
export class AppModule {}
