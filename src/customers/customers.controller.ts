import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customers } from './customers';

@Controller('customers')
export class CustomersController {
  constructor(private readonly custormerService: CustomersService) {}

  @Post()
  async create(@Body() customer: Customers): Promise<Customers> {
    return this.custormerService.create(customer);
  }

  @Put(':id')
  async updateCustomers(): Promise<Customers> {
    return;
  }

  @Get(':id')
  async getById(): Promise<Customers> {
    return;
  }

  @Post()
  authToken(): string {
    return;
  }
}
