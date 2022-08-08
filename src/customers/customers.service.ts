import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';
import { CreateCustomersDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(customer: CreateCustomersDto) {
    const customers = {
      id: uuidv4(),
      document: customer.document,
      name: customer.name,
    };
    const createdCustomer = new this.customerModel(customers);
    return await createdCustomer.save();
  }

  async getAll() {
    return await this.customerModel.find().exec();
  }

  async getById(id: string) {
    return await this.customerModel.findById(id).exec();
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerModel.findByIdAndUpdate(id, updateCustomerDto);
  }

  async destroy(id: string) {
    return await this.customerModel.deleteOne({ id: id }).exec();
  }
}
