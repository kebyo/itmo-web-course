import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserInvalidCredentials {
  @ApiProperty()
  error: string;
}
