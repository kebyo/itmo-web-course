import { Module } from '@nestjs/common';

import {UserRestModule} from "./rest/user.rest-module";
import { UserDatabaseModule } from './database/user.database-module';

@Module({
  imports: [UserDatabaseModule, UserRestModule],
})
export class UserModule {}
