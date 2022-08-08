import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomersDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomersDto) {}
