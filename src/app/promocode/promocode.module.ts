import { Module } from '@nestjs/common';
import {PromocodeDatabaseModule} from './database/promocode.database-module';
import {PromocodeRestModule} from './rest/promocode.rest-module';

@Module({
  imports: [
    PromocodeDatabaseModule,
    PromocodeRestModule,
  ],
})
export class PromocodeModule {}