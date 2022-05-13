import {ApiProperty} from '@nestjs/swagger';
import {UserCommonFields} from '../../user/common/user.common-fields';
import {IsEmail, IsString, MinLength} from 'class-validator';

export class SignUpDto {
	@ApiProperty()
	name: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	password: string;
}

export class LoginDto {
	@ApiProperty()
	@IsString()
	@MinLength(5)
	password: string;

	@ApiProperty()
	@IsEmail()
	email: string;
}