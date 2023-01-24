import { Module } from '@nestjs/common';
import { configModule } from './moduleConfig/config';
import { typeormModule } from './moduleConfig/typeorm';

@Module({
    imports: [configModule, typeormModule],
})
export class AppModule {}
