import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { VercelRequest, VercelResponse } from '@vercel/node';

let server: any;

async function bootstrap() {
  if (!server) {
    const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });

    // Validation globale pour DTOs
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
    
    // Get the underlying Express instance
    const expressApp = app.getHttpAdapter().getInstance();
    server = expressApp;
  }
  return server;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = await bootstrap();
    
    // Handle the request with Express app
    app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
}
