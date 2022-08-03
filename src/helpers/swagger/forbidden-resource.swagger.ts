import { ApiProperty } from '@nestjs/swagger';

export class ForbbidenResourceSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
