import { Injectable, NotFoundException } from '@nestjs/common';
import { Customers } from './customers';
import { RedisMethods } from '../cache/redis';
import { v4 as uuidv4 } from 'uuid';
import { CustomersDto } from 'src/dto/customers.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly redis: RedisMethods) {}

  create(customer: CustomersDto): CustomersDto {
    const customers = {
      id: uuidv4(),
      document: customer.document,
      name: customer.name,
    };
    this.redis.set(customer.id, customers);
    return customers;
  }

  async updateCustomer(customer: CustomersDto) {
    this.redis.get(customer.id);

    const { document, name } = customer;
    customer.name = name;
    customer.document = document;

    return this.redis.set(customer.id, customer);
  }

  getById(customer: Customers) {
    try {
      return this.redis.get(customer.id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  destroy(customer: Customers) {
    return this.redis.del(customer.id);
  }

  authToken(): string {
    return;
  }
}
