import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customers } from './customers';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post()
  async create(@Body() customer: Customers): Promise<Customers> {
    return this.customerService.create(customer);
  }

  @Put(':id')
  async updateCustomers(
    @Param('id') id: Customers,
    @Body() customer: Customers,
  ) {
    await this.customerService.updateCustomer(id, customer);

    return customer;
  }

  @Get(':id')
  async getById(@Param('id') customer: Customers): Promise<string> {
    return this.customerService.getById(customer);
  }

  @Post()
  authToken() {
    return;
  }
}
