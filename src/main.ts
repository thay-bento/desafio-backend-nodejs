import { NestFactory } from '@nestjs/core';
import { CustomersModule } from './customers/customers.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomersModule);
  await app.listen(3000);
}
bootstrap();
