import { NestFactory } from '@nestjs/core';
import { MainApiModule } from './main-api.module';

async function bootstrap() {
  const app = await NestFactory.create(MainApiModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
