import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../../user/user.module';
import { AuthCommonModule } from '../common/authCommon.module';
import { AuthDatabaseModule } from '../database/auth.database-module';
import { AuthController } from './auth.controller';
import {UserDatabaseModule} from '../../user/database/user.database-module';

@Module({
  imports: [
    AuthCommonModule,
    UserDatabaseModule,
    AuthDatabaseModule,
  ],
  controllers: [AuthController],
})
export class AuthRestModule {}
