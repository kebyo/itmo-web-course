import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenResponseDto {
  @ApiProperty()
  error: 'Unauthorized';

  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: 401;
}
