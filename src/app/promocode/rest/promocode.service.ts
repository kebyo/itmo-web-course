import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promocode } from '../database/promocode.entity';
import { Repository } from 'typeorm';
import { PromocodeCreateDto, PromocodeUpdateDto } from './promocode.dtos';
import { User } from '../../user/database/user.entity';
import { applyChanges } from '../../../utils/object';

@Injectable()
export class PromocodeService {
  constructor(
    @InjectRepository(Promocode)
    private readonly promocodeRepo: Repository<Promocode>,
  ) {}

  async create(currentUser: User, input: PromocodeCreateDto): Promise<Promocode> {
    const promocode = this.promocodeRepo.create({
      ownerId: currentUser.id,
      ...input,
    });

    return this.promocodeRepo.save(promocode);
  }

  async delete(currentUser: User, id: number) {
    const promocode = await this.promocodeRepo.findOneOrFail(id);

    if (promocode.ownerId !== currentUser.id) {
      throw new ForbiddenException('Это промокод не принадлежит вам');
    }

    return this.promocodeRepo.delete(promocode.id);
  }

  async update(id: number, input: PromocodeUpdateDto) {
    const promocode = await this.promocodeRepo.findOneOrFail(id);

    applyChanges(promocode, input);

    return this.promocodeRepo.save(promocode);
  }

  async findOneOrFail(id: number) {
    return this.promocodeRepo.findOneOrFail(id);
  }

  async findAll() {
    return this.promocodeRepo.find();
  }

}
