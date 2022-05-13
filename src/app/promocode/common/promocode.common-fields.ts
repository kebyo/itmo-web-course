import { Column } from 'typeorm';
import {IsNotEmpty, IsUrl, MaxLength} from 'class-validator';
import {Expose} from 'class-transformer';

export class PromocodeCommonFields {
	@Column('text', {name: 'product_name'})
	@IsNotEmpty()
	productName: string;

	@Column('text', {name: 'product_url'})
	@Expose()
	@IsUrl()
	productUrl: string;

	@Column('float', {name: 'sale_size'})
	@Expose()
	saleSize: number;

	@Column('text')
	@Expose()
	description: string;

	@Column({
		type: 'varchar',
		length: 10,
	})
	@MaxLength(10)
	@IsNotEmpty()
	code: string;
}
