import { Column } from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';


export class UserCommonFields {
  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  @ApiProperty()
  @IsEmail()
  email: string;
}
