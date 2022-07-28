import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CustomersDto {
  id: string;

  @IsNotEmpty()
  @IsInt()
  document: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
