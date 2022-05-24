import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {JwtAccessPayload, jwtExpiration} from '../../../config/jwt';
import { User } from '../../user/database/user.entity';
import { UserService } from '../../user/rest/user.service';
import {AuthResponseDto} from '../dtos/auth-response.dto';

/**
 * Сервис аутентификации
 */
@Injectable()
export class AuthCommonService {
  constructor(
    private readonly userService: UserService,
  ) {}

  /**
   * Получает пользователя из проверенного jwt-токена
   */
  async getUserFromJwtPayload(payload: JwtAccessPayload) {
    const user = await this.userService.getById(payload.id);

    return this.requireUser(user);
  }

  /**
   * Выбрасывает ошибку авторизации, если передано пустое значение
   */
  requireUser(user?: User) {
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }


  async getUserFromEmailAndPassword(email: string, password: string): Promise<User> {
    return this.userService.checkUserCredentials(email, password);
  }
}
