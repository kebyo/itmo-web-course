import { Module } from '@nestjs/common';

import { UserDatabaseModule } from '../database/user.database-module';
import { UserController } from './user.controller';

@Module({
  imports: [
    UserDatabaseModule,
  ],
  controllers: [UserController],
})
export class UserRestModule {}
