import { Module } from '@nestjs/common';
import {PromocodeDatabaseModule} from '../database/promocode.database-module';
import {PromocodeController} from './promocode.controller';

@Module({
  imports: [PromocodeDatabaseModule],
  controllers: [PromocodeController],
})
export class PromocodeRestModule {}