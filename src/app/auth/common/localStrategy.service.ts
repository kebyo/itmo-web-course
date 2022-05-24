import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthCommonService } from './authCommon.service';
import { User } from '../../user/database/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authCommonService: AuthCommonService) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return this.authCommonService.getUserFromEmailAndPassword(email, password);
  }
}
