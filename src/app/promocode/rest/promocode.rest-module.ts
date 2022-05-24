import { Module } from '@nestjs/common';
import {PromocodeDatabaseModule} from '../database/promocode.database-module';
import {PromocodeController} from './promocode.controller';
import { PromocodeService } from './promocode.service';

@Module({
  imports: [PromocodeDatabaseModule],
  controllers: [PromocodeController],
  providers: [PromocodeService],
  exports: [PromocodeService],
})
export class PromocodeRestModule {}
