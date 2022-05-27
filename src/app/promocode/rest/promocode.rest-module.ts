import { Module } from '@nestjs/common';
import {PromocodeDatabaseModule} from '../database/promocode.database-module';
import {PromocodeController} from './promocode.controller';
import { PromocodeService } from './promocode.service';
import { PromcodeWsModule } from '../ws/promcode.ws-module';

@Module({
  imports: [PromocodeDatabaseModule, PromcodeWsModule],
  controllers: [PromocodeController],
  providers: [PromocodeService],
  exports: [PromocodeService],
})
export class PromocodeRestModule {}
