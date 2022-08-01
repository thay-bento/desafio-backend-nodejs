import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CustomersModule } from './customers/customers.module';

require('dotenv/config');
async function bootstrap() {
  const app = await NestFactory.create(CustomersModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
