import { Module } from '@nestjs/common';
import { CustomersDto } from 'src/dto/customers.dto';
import { RedisMethods } from 'src/cache/redis';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [CustomersDto, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [CustomersController],
  providers: [CustomersService, RedisMethods],
})
export class CustomersModule {}
