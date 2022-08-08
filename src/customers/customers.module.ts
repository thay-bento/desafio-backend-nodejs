import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer, CustomerSchema } from 'src/schemas/customer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
