// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as RateLimit from 'express-rate-limit';

import AppModule from './components/app/app.module';

import AllExceptionsFilter from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('MYSQL HOST', process.env.MYSQL_HOST);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  // app.enableCors({
    // origin: ['http://vue:80', 'http://localhost:8080', `http://localhost:${process.env.VUE_DEVELOPMENT_PORT}`],
  // });

  // rate limit

  // app.use(RateLimit({
  //     // windowMs: 15 * 60 * 1000, // 15 minutes
  //     // max: 100, // limit each IP to 100 requests per windowMs
  //     windowMs: 1 * 60 * 1000,
  //     max: 1,
  //   }),
  // );

  const port = process.env.SERVER_PORT || 3000;

  const options = new DocumentBuilder()
    .setTitle('Api v1')
    .setDescription('Scraping API Version I')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(port, async () => {
    console.log(`The server is running on ${port} port: http://localhost:${port}/api`);
  });
}
bootstrap();
