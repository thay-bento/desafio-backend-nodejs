import { Injectable } from '@nestjs/common';
import { Customers } from './customers';
import { redis } from '../redis';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomersService {
  create(customer: Customers) {
    const customers = {
      id: uuidv4(),
      document: customer.document,
      name: customer.name,
    };
    // alterar value do set
    redis.set(customer.id, customer.name);
    return customers;
  }

  updateCustomer(customer: Customers): string {
    return;
  }

  getById(id: string) {
    const customer = redis.get(id);
    return customer;
  }

  authToken(): string {
    return;
  }
}
