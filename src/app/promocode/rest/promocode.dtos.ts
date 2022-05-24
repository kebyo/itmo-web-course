import {PromocodeCommonFields} from '../common/promocode.common-fields';
import {Exclude} from 'class-transformer';
import {PromocodeFields} from '../common/promocode.fields';
import {PartialType} from '@nestjs/mapped-types';

@Exclude()
export class PromocodeDto extends PromocodeFields {}

export class PromocodeCreateDto extends PromocodeCommonFields {}

export class PromocodeUpdateDto extends PartialType(PromocodeCommonFields) {}

export class PromocodeDeleteDto {
	success: boolean;
}
