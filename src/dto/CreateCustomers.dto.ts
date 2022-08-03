import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomersDto {
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: "Document's number", minimum: 9, default: 9 })
  document: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
