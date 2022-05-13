import { Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

import {PromocodeCommonFields} from './promocode.common-fields';
import {Expose} from 'class-transformer';

export class PromocodeFields extends PromocodeCommonFields {
	@PrimaryGeneratedColumn()
	@Expose()
	id: number;

	@Column('int', {name: 'owner_id'})
	@Expose()
	ownerId: number;
}
