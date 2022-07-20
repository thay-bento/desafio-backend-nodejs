import { Injectable } from '@nestjs/common';
import { Customers } from './customers';
import { RedisMethods } from '../redis';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomersService {
  constructor(private readonly redis: RedisMethods) {}

  create(customer: Customers) {
    const customers = {
      id: uuidv4(),
      document: customer.document,
      name: customer.name,
    };
    this.redis.set(customer.id, customers);
    return customers;
  }

  async updateCustomer(customer: Customers, customers: Customers) {
    this.redis.get(customer.id);
    this.redis.set(customer.id, customers);

    return customers;
  }

  getById(customer: Customers) {
    return this.redis.get(customer.id);
  }

  authToken(): string {
    return;
  }
}
