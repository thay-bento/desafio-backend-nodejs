import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    CustomersModule,
    MongooseModule.forRoot(
      'mongodb+srv://mongo:lKWl224slrPks3zo@cluster0.4vrqy0m.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
