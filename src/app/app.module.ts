import { Module } from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {PromocodeModule} from './promocode/promocode.module';

import {CommonModule} from '../common/common.module';

@Module({
  imports: [
    CommonModule,
    PromocodeModule,
    UserModule,
    AuthModule
  ],
})
export class AppModule {}
