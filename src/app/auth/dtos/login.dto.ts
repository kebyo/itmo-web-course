import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, MinLength} from 'class-validator';
import {UserCommonFields} from '../../user/common/user.common-fields';

export class LoginDto {
	email: string;
	password: string;
}