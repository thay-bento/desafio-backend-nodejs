import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RedisMethods } from '../cache/redis';
import { v4 as uuidv4 } from 'uuid';
import { CreateCustomersDto } from '../dto/CreateCustomers.dto';
import { Customers } from './customers';

@Injectable()
export class CustomersService {
  constructor(private readonly redis: RedisMethods) {}

  create(customer: CreateCustomersDto): CreateCustomersDto {
    const customers = {
      id: uuidv4(),
      document: customer.document,
      name: customer.name,
    };
    this.redis.set(customers.id, customers);
    return customers;
  }

  async updateCustomer(id: string, customer: CreateCustomersDto): Promise<any> {
    const getID = await this.redis.get(id);

    if (!getID) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const { document, name } = customer;
    getID.document = document;
    getID.name = name;

    this.redis.set(id, getID);

    return getID;
  }

  async getById(id: string): Promise<Customers> {
    return await this.redis.get(id);
  }

  destroy(id: string): Promise<number> {
    return this.redis.del(id);
  }
}
