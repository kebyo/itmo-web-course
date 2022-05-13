import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Promocode} from './promocode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Promocode])],
  exports: [TypeOrmModule],
})
export class PromocodeDatabaseModule {}