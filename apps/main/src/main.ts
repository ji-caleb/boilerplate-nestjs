import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from '@app/common/filters/all-exceptions.filter';
import { winstonLogger } from '@app/common/logger/winston.logger';

async function bootstrap() {
  const logger = winstonLogger();
  const app = await NestFactory.create(AppModule, { logger });

  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
