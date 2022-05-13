import { PrimaryGeneratedColumn } from 'typeorm';

import { UserCommonFields } from './user.common-fields';
import {ApiProperty} from '@nestjs/swagger';

export class UserFields extends UserCommonFields {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
}
