import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post, Redirect,
  Render, Req, Res, Session, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '../../user/rest/user.service';
import { AuthCommonService } from '../common/authCommon.service';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { LoginDto, SignUpDto } from './auth.dtos';
import { CurrentUser } from '../common/currentUser.decorator';
import { User } from '../../user/database/user.entity';
import { LoginGuard } from '../common/login.guard';
import { Request, Response } from 'express';
import { CookieAuthenticationGuard } from '../common/coockieAuth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authCommonService: AuthCommonService,
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
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LoginGuard)
  @Redirect('/')
  async login(
    @Body() body: LoginDto,
    @CurrentUser() user: User,
  ) {
    const { email, password } = body;

    // return this.userService.checkUserCredentials(email, password);

    return user;
  }

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

  @UseGuards(CookieAuthenticationGuard)
  @Get('logout')
  @Redirect('/')
  async logout(@Req() req: Request) {
    // req.logOut();
    req.session.cookie.maxAge = 0;
  }
}
