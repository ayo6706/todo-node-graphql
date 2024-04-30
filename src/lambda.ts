import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as serverless from 'serverless-http';
import * as express from 'express';
import { AppModule } from './app.module';

let cachedServer;

async function bootstrap() {
  if (!cachedServer) {
    const server = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    await app.init();
    cachedServer = serverless(server);
  }
  return cachedServer;
}

export const handler = async (event, context) => {
  const server = await bootstrap();
  return server(event, context);
};
