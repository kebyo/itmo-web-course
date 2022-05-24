import { ApiProperty } from '@nestjs/swagger';

export class SqlValidationErrorDto {
  @ApiProperty()
  statusCode: 422;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
