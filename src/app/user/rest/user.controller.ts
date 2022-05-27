import {
  Body, ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  HttpCode,
  Param, Patch,
  Render,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { User } from '../database/user.entity';
import { UserService } from './user.service';
import { UserDto, UserUpdateDto, ValidationErrorDto } from './user.dtos';
import {CurrentUser} from '../../auth/common/currentUser.decorator';
import {AuthResponseDto} from '../../auth/dtos/auth-response.dto';
import { Response } from 'express';
import { CookieAuthenticationGuard } from '../../auth/common/cookieAuthentication.guard';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(CookieAuthenticationGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Update user fields',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    type: ValidationErrorDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated user',
    type: UserDto,
  })
  @HttpCode(200)
  @Patch()
  async update(@Body() updateDto: UserUpdateDto, @CurrentUser() user) {
    return this.userService.updateUser(user.id, updateDto);
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted user',
    type: Boolean,
  })
  @HttpCode(200)
  @Delete()
  async delete(@CurrentUser() user: User) {
    return this.userService.delete(user.id);
  }

  @Get()
  @Render('account')
  async getAll(@CurrentUser() currentUser: User, @Res() res: Response) {
    if (!currentUser) {
      res.redirect('/auth/login');
    }

    const user = await this.userService.getByIdOrFail(currentUser.id, ['promocodes']);

    return {
      user,
    }
  }
}
