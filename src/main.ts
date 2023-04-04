import { NestFactory } from '@nestjs/core';
import { Context, Callback, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

import helmet from 'helmet';

import { AppModule } from './app.module';

const port = process.env.PORT || 4000;
let server: Handler;


async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};