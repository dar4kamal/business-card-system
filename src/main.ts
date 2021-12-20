import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { UniversalExceptionFilter } from './utility/universal.filter';
import { TransformInterceptor } from './utility/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new UniversalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(5000);
}
bootstrap();
