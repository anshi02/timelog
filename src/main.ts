import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const host = configService.getOrThrow<string>('app.host');
    const port = configService.getOrThrow<number>('app.port');
    await app.listen(port, host);
    console.log(`Listening on http://${host}:${port}`);
}
bootstrap();
