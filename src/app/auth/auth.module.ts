import { Module } from '@nestjs/common';

import {AuthRestModule} from "./rest/auth.rest-module";

@Module({
  imports: [AuthRestModule],
  exports: [AuthRestModule],
})
export class AuthModule {}
