import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app/app.module';
import { appHost, appPort } from './config/environment';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());

  // Активируем рендеринг ejs шаблонов
  app.setBaseViewsDir([join(process.cwd(), 'src/views')]);
  app.setViewEngine('ejs');

  await app.listen(appPort, appHost);
}

bootstrap().catch((e) => console.error(`Uncaught error`, e));
