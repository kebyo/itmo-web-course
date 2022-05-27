import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get, HttpCode,
  Patch,
  Post, Redirect,
  Render, Req, Res, Session, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from '../../user/rest/user.service';
import { AuthCommonService } from '../common/authCommon.service';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { CredentialsErrorDto, LoginDto, SignUpDto } from './auth.dtos';
import { CurrentUser } from '../common/currentUser.decorator';
import { User } from '../../user/database/user.entity';
import { LoginGuard } from '../common/login.guard';
import { Request, Response } from 'express';
import { CookieAuthenticationGuard } from '../common/coockieAuth.guard';
import { PromocodeDto } from '../../promocode/rest/promocode.dtos';
import { UserDto, ValidationErrorDto } from '../../user/rest/user.dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('login')
  @Render('auth/login')
  async loginPage() {
    return;
  }

  @Get('signup')
  @Render('auth/signup')
  async signupPage() {
    return;
  }

  /**
   * Выполняет аутентификацию с использованием email/phone и пароля
   */
  @ApiOperation({
    summary: 'Login',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully login',
    type: UserDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Wrong credentials Error',
    type: CredentialsErrorDto,
  })
  @HttpCode(200)
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LoginGuard)
  @Redirect('/')
  async login(
    @Body() body: LoginDto,
    @CurrentUser() user: User,
  ) {
    return user;
  }

  @ApiOperation({
    summary: 'Sign up',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully sign up',
    type: UserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation Error',
    type: ValidationErrorDto,
  })
  @HttpCode(200)
  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @Redirect('login')
  async signup(@Body() body: SignUpDto) {
    const { email } = body;

    const potentialUser = await this.userService.getByEmail(email);

    if (potentialUser) {
      throw new BadRequestException(
        'User with this email or phone already exists',
      );
    }

    return this.userService.createUser(body);
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Logout',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully logout',
    type: Boolean,
  })
  @UseGuards(CookieAuthenticationGuard)
  @Get('logout')
  @Redirect('/')
  async logout(@Req() req: Request) {
    req.session.cookie.maxAge = 0;

    return true;
  }
}
