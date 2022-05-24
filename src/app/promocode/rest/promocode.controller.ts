import {
  Body, ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get, Logger,
  Param,
  Patch,
  Post, Redirect,
  Render, Session,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promocode } from '../database/promocode.entity';
import { Repository } from 'typeorm';
import {
  PromocodeCreateDto,
  PromocodeDeleteDto, PromocodeUpdateDto,
} from './promocode.dtos';
import { CurrentUser } from '../../auth/common/currentUser.decorator';
import { User } from '../../user/database/user.entity';
import { applyChanges } from '../../../utils/object';
import { LoginGuard } from '../../auth/common/login.guard';
import { CookieAuthenticationGuard } from '../../auth/common/cookieAuthentication.guard';
import { PromocodeService } from './promocode.service';

@Controller('promocodes')
@UseInterceptors(ClassSerializerInterceptor)
export class PromocodeController {
  constructor(
    private readonly promocodeService: PromocodeService,
  ) {}

  @Get()
  @Render('mainPage')
  async getAll(@CurrentUser() user: User, @Session() session) {
    const promocodes = await this.promocodeService.findAll();

    return {
      promocodes,
      isAuth: !!user,
    };
  }

  @Get('update/:id')
  @UseGuards(CookieAuthenticationGuard)
  @Render('promocode/update')
  async updatePage(@Param('id') id: number) {
    const promocode = await this.promocodeService.findOneOrFail(id);

    return {
      promocode,
    };
  }

  @Get('create')
  @UseGuards(CookieAuthenticationGuard)
  @Render('promocode/create')
  async createPage() {
    return;
  }

  @Post()
  @UseGuards(CookieAuthenticationGuard)
  @Redirect('/')
  async create(
    @Body() body: PromocodeCreateDto,
    @CurrentUser() user: User,
  ): Promise<Promocode> {
    return this.promocodeService.create(user, body);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<PromocodeDeleteDto> {
    const res = await this.promocodeService.delete(user, id);

    return {
      success: !!res.affected,
    };
  }

  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body() body: PromocodeUpdateDto,
    @CurrentUser() user: User,
  ): Promise<Promocode> {
    return this.promocodeService.update(id, body);
  }
}
