import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomersModule } from './customers/customers.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomersModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Customer API - Desafio Backend NodeJs ')
    .setDescription('RESTful API')
    .setVersion('1.0')
    .addTag('customer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('customers/swagger', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
