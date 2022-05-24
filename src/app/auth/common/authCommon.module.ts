import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { jwtExpiration, jwtSecretKey } from '../../../config/jwt';
import { UserModule } from '../../user/user.module';
import { AuthCommonService } from './authCommon.service';
import {UserDatabaseModule} from '../../user/database/user.database-module';
import { LocalStrategy } from './localStrategy.service';
import { LocalSerializer } from './local.serializer';
import { LoginGuard } from './login.guard';
import { CookieAuthenticationGuard } from './coockieAuth.guard';

/**
 * Модуль аутентификации
 */
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local', session: true,}),
    UserDatabaseModule,
  ],
  providers: [AuthCommonService, LocalStrategy, LocalSerializer, LoginGuard, CookieAuthenticationGuard],
  exports: [AuthCommonService],
})
export class AuthCommonModule {}
