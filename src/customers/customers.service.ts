import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    this.redis.set(customers.id, customers);
    return customers;
  }

  async updateCustomer(id: string, customer: CustomersDto) {
    const getID = await this.redis.get(id);

    if (!getID) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const { document, name } = customer;
    getID.document = document;
    getID.name = name;

    this.redis.set(id, getID);

    return getID;
  }

  async getById(id: string) {
    return await this.redis.get(id);
  }

  destroy(id: string) {
    return this.redis.del(id);
  }
}
