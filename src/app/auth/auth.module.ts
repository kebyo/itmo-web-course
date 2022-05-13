import { Module } from '@nestjs/common';

import {AuthRestModule} from "./rest/auth.rest-module";
import { AuthDatabaseModule } from './database/auth.database-module';

@Module({
  imports: [AuthDatabaseModule, AuthRestModule],
  exports: [AuthDatabaseModule, AuthRestModule],
})
export class AuthModule {}
