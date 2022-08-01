import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true, envFilePath: '.teste.env' }),
    CustomersModule,
  ],
})
export class AppModule {}
