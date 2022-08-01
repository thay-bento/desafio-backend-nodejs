import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customers } from './customers';
import { CustomersDto } from '../dto/customers.dto';
import { RolesGuard } from '../auth/roles.guard.auth';

@Controller('customers')
@UseGuards(RolesGuard)
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post()
  @SetMetadata('roles', ['admin', 'user'])
  async create(@Body() customer: CustomersDto): Promise<Customers> {
    return this.customerService.create(customer);
  }

  @Put(':id')
  @SetMetadata('roles', ['admin', 'user'])
  async updateCustomer(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() customer: CustomersDto,
  ) {
    return await this.customerService.updateCustomer(id, customer);
  }

  @Get(':id')
  @SetMetadata('roles', ['admin', 'user'])
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const getCustomer = await this.customerService.getById(id);
    if (!getCustomer)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return getCustomer;
  }

  @Delete(':id')
  @SetMetadata('roles', ['admin', 'user'])
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    const destroyCustomer = await this.customerService.destroy(id);

    if (!destroyCustomer)
      throw new HttpException('Customer NOT FOUND!!', HttpStatus.NOT_FOUND);
  }
}
