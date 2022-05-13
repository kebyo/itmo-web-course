import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { jwtExpiration, jwtSecretKey } from '../../../config/jwt';
import { UserModule } from '../../user/user.module';
import { AuthDatabaseModule } from '../database/auth.database-module';
import { AuthCommonService } from './authCommon.service';
import { JwtStrategy, STRATEGY_JWT } from './jwtStrategy.service';
import {UserDatabaseModule} from '../../user/database/user.database-module';

/**
 * Модуль аутентификации
 */
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: STRATEGY_JWT }),
    JwtModule.register({
      secret: jwtSecretKey,
      signOptions: {
        expiresIn: jwtExpiration,
      },
    }),
    UserDatabaseModule,
    AuthDatabaseModule,
  ],
  providers: [AuthCommonService, JwtStrategy],
  exports: [AuthCommonService, JwtModule],
})
export class AuthCommonModule {}
