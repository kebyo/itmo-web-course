import { Module } from '@nestjs/common';
import { PromocodeGateway } from './promocode.gateway';

@Module({
  imports: [],
  providers: [PromocodeGateway],
  exports: [PromocodeGateway],
})
export class PromcodeWsModule {}
