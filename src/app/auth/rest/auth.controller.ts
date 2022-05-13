import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from '../../user/database/user.service';
import { AuthCommonService } from '../common/authCommon.service';
import { UserTokensService } from '../database/userTokens.service';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { ForbiddenResponseDto } from '../dtos/forbidden-response.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import {LoginDto, SignUpDto} from './auth.dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly userTokensService: UserTokensService,
    private readonly authCommonService: AuthCommonService,
  ) {}

  /**
   * Выполняет аутентификацию с использованием email/phone и пароля
   */
  // @ApiOperation({
  //   summary: 'Login into application',
  // })
  // @ApiOkResponse({
  //   description: 'Login into application',
  //   type: AuthResponseDto,
  // })
  // @ApiResponse({
  //   status: 401,
  //   type: ForbiddenResponseDto,
  // })
  // @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = body;

    const user = await this.userService.checkUserCredentials(
      email,
      password,
    );

    return this.authCommonService.generateResponse(user);
  }

  // /**
  //  * Выполняет аутентификацию с использованием email/phone и пароля
  //  */
  // @ApiOperation({
  //   summary: 'Login into application',
  // })
  // @ApiOkResponse({
  //   description: 'Login into application',
  //   type: AuthResponseDto,
  // })
  // @ApiResponse({
  //   status: 401,
  //   type: ForbiddenResponseDto,
  // })
  // @HttpCode(200)
  @Post('signup')
  async signup(@Body() body: SignUpDto): Promise<AuthResponseDto> {
    const { email } = body;

    const potentialUser = await this.userService.getByEmail(email);

    if (potentialUser) {
      throw new BadRequestException('User with this email or phone already exists');
    }

    const user = await this.userService.createUser(body);

    return this.authCommonService.generateResponse(user);
  }

  // /**
  //  * Позволяет получить новый токен по refresh-токену
  //  */
  // @ApiOperation({
  //   summary: 'Get updated access token by refresh token',
  // })
  // @ApiOkResponse({
  //   description: 'Got updated access token',
  //   type: AuthResponseDto,
  // })
  // @ApiResponse({
  //   status: 401,
  //   type: ForbiddenResponseDto,
  // })
  // @ApiOkResponse({
  //   description: 'Refresh token',
  //   type: String,
  // })
  @Patch('refresh')
  async useRefreshToken(
    @Body() body: RefreshTokenDto,
  ): Promise<AuthResponseDto> {
    const user = await this.userTokensService.useAuthToken(body.token);

    return this.authCommonService.generateResponse(user);
  }
}
