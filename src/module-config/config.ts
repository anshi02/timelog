import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import authConfig from 'src/config/auth.config';
import dbConfig from 'src/config/db.config';

export const configModule = ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfig, dbConfig, authConfig],
});
