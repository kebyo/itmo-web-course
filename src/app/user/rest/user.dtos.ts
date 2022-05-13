import {UserFields} from '../common/user.fields';
import {ApiProperty, PartialType} from '@nestjs/swagger';
import {UserCommonFields} from '../common/user.common-fields';
import {IsNull} from 'typeorm';
import {IsNumber, IsString, Min, ValidateIf} from 'class-validator';

export class UserDto extends UserFields {}

export class ValidationErrorDto {
	@ApiProperty()
	statusCode: 400;

	@ApiProperty()
	message: string[];

	@ApiProperty()
	error: string;
}

export class UserUpdateDto extends PartialType(UserCommonFields) {
	@ApiProperty({nullable: true})
	@ValidateIf(o => o.password)
	@IsString()
	@Min(6)
	password?: string;
}
