import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
    //validando se é um UUID com ParseUUIDPipe()
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() customer: CustomersDto,
  ) {
    this.customerService.updateCustomer(customer);

    return customer;
  }

  @Get(':id')
  @SetMetadata('roles', ['admin', 'user'])
  getById(
    @Param('id', new ParseUUIDPipe()) customer: Customers,
  ): Promise<string> {
    return this.customerService.getById(customer);
  }

  @Delete(':id')
  @SetMetadata('roles', ['admin', 'user'])
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) customer: Customers) {
    await this.customerService.destroy(customer);
  }

  @Post()
  authToken() {
    return;
  }
}
