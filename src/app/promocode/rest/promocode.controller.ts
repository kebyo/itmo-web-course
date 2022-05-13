import {Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Render, UseGuards} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Promocode} from '../database/promocode.entity';
import {Repository} from 'typeorm';
import {PromocodeCreateDto, PromocodeDeleteDto, PromocodeUpdate} from './promocode.dtos';
import {CurrentUser} from '../../auth/common/currentUser.decorator';
import {User} from '../../user/database/user.entity';
import {applyChanges} from '../../../utils/object';
import {JwtAuthGuard} from '../../auth/common/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('promocodes')
export class PromocodeController {
	constructor(
		@InjectRepository(Promocode)
		private readonly promocodeRepo: Repository<Promocode>,
	) {}

	@Get()
	async getAll() {
		return this.promocodeRepo.find();
	}

	@Get(':id')
	async getById(@Param('id') id: number) {
		return this.promocodeRepo.findOneOrFail(id);
	}

	@Post()
	async create(@Body() body: PromocodeCreateDto, @CurrentUser() user: User): Promise<Promocode> {
		const promocode = this.promocodeRepo.create({
			ownerId: user.id,
			...body
		});

		return this.promocodeRepo.save(promocode);
	}

	@Delete('/:id')
	async delete(@Param('id') id: number, @CurrentUser() user: User): Promise<PromocodeDeleteDto> {
		const promocode = await this.promocodeRepo.findOneOrFail(id);

		if (promocode.ownerId !== user.id) {
			throw new ForbiddenException('Это промокод не принадлежит вам');
		}

		const res = await this.promocodeRepo.delete(promocode.id);

		return {
			success: !!res.affected,
		}
	}

	@Patch('/:id')
	async update(
		@Param('id') id: number,
		@Body() body: PromocodeUpdate,
		@CurrentUser() user: User
	): Promise<Promocode> {
		const promocode = await this.promocodeRepo.findOneOrFail(id);

		applyChanges(promocode, body);

		return this.promocodeRepo.save(promocode);
	}
}