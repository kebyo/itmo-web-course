import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {STRATEGY_JWT} from './jwtStrategy.service';


/**
 * Guard, требующий аутентифицированного пользователя
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard(STRATEGY_JWT) {}
