import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorDto {
  @ApiProperty()
  statusCode: 400;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;
}
