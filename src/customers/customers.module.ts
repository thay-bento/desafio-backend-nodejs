import { Module } from '@nestjs/common';
import { RedisMethods } from 'src/redis';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
@Module({
  imports: [CustomersModule],
  controllers: [CustomersController],
  providers: [CustomersService, RedisMethods],
})
export class CustomersModule {}
