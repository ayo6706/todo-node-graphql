import * as serverless from 'serverless-http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Application } from 'express';
let cachedServer;

async function bootstrap() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    cachedServer = serverless(app as unknown as Application);
    // cachedServer = serverless(app);
  }
  return cachedServer;
}

export const handler = async (event, context) => {
  const server = await bootstrap();
  return server(event, context);
};