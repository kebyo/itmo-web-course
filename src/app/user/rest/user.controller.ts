import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param, Patch,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { User } from '../database/user.entity';
import { UserService } from '../database/user.service';
import { RegisterUserInvalidCredentials } from '../dtos/register-user-invalid-credentials';
import { SqlValidationErrorDto } from '../dtos/sql-validation-error.dto';
import { ValidationErrorDto } from '../dtos/validation-error.dto';
import {JwtAuthGuard} from '../../auth/common/jwt-auth.guard';
import {UserDto,  UserUpdateDto} from './user.dtos';
import {CurrentUser} from '../../auth/common/currentUser.decorator';
import {AuthResponseDto} from '../../auth/dtos/auth-response.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

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
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 422,
    description: 'SQL error',
    type: SqlValidationErrorDto,
  })
  @HttpCode(200)
  @Patch()
  async update(@Body() userDto: UserUpdateDto, @CurrentUser() user) {
    return this.userService.updateUser(user.id, userDto);
  }

  @ApiBearerAuth()
  @Delete()
  async delete(@CurrentUser() user: User) {
    return this.userService.delete(user.id);
  }

  @ApiBearerAuth()
  @Get('/:id')
  async getById(@Param('id') id: number): Promise<UserDto> {
    return this.userService.getByIdOrFail(id);
  }

  @ApiBearerAuth()
  @Get()
  async getAll(@Param('id') id: number) {
    return this.userService.getAll();
  }
}
