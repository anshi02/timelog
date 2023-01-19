import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import dbConfig from './config/db.config';
import appConfig from './config/app.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [dbConfig, appConfig],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql' as const,
                host: configService.get<string>('db.hostname'),
                port: configService.get<number>('db.port'),
                username: configService.get<string>('db.username'),
                password: configService.get<string>('db.password'),
                database: configService.get<string>('db.databaseName'),
                synchronize: true,
                connectTimeout: 15000, // 15 secs
            }),
        }),
    ],
})
export class AppModule {}
