import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { stdTimeFunctions } from 'pino';

import { isProduction } from '../config/environment';
import ormConfig from '../config/ormconfig';
import { ExceptionsModule } from './exceptions/exceptions.module';
import {preparePinoMultistream} from '../utils/logger';

@Global()
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: [
        {
          level: isProduction ? 'info' : 'debug',
          redact: [
            // В целях безопасности не логируем кукисы
            'req.headers.cookie',
            // И токен аутентификации
            'req.headers.authorization',
          ],
          timestamp: stdTimeFunctions.isoTime,
        },
        preparePinoMultistream(),
      ],
    }),
    TypeOrmModule.forRoot(ormConfig),
    ExceptionsModule,
  ],
  exports: [LoggerModule, TypeOrmModule],
})
export class CommonModule {}
