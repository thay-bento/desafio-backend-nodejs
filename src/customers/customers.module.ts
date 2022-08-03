import { Module } from '@nestjs/common';
import { CreateCustomersDto } from '../dto/CreateCustomers.dto';
import { RedisMethods } from '../cache/redis';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [CreateCustomersDto, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [CustomersController],
  providers: [CustomersService, RedisMethods],
})
export class CustomersModule {}
