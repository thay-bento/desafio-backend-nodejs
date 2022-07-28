import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CustomersModule } from './customers/customers.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomersModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
