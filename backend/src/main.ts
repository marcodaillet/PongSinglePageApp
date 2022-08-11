import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import "reflect-metadata";



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 // app.useWebSocketAdapter(new WsAdapter(app));
  app.use(cookieParser())
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    "origin": "http://localhost:3001",
    "credentials": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200,
  })
  await app.listen(3000);
}
bootstrap();
