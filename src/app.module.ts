import { Module } from '@nestjs/common';
import { CustomersController } from './customers/customers.controller';
import { CustomersModule } from './customers/customers.module';
import { CustomersService } from './customers/customers.service';
import { RedisMethods } from './redis';

@Module({
  imports: [CustomersModule],
  controllers: [CustomersController],
  providers: [CustomersService, RedisMethods],
})
export class AppModule {}
