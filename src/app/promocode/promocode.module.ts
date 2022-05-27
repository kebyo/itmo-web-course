import { Module } from '@nestjs/common';
import {PromocodeDatabaseModule} from './database/promocode.database-module';
import {PromocodeRestModule} from './rest/promocode.rest-module';
import { PromcodeWsModule } from './ws/promcode.ws-module';

@Module({
  imports: [
    PromocodeDatabaseModule,
    PromocodeRestModule,
    PromcodeWsModule
  ],
})
export class PromocodeModule {}
