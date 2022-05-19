import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PromocodeModule } from './promocode/promocode.module';

import { CommonModule } from '../common/common.module';
import { AppController } from './app.controller';

@Module({
  imports: [CommonModule, PromocodeModule, UserModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
