import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation globale pour DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Authentication API with NestJS')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config); // <- créer le document
  SwaggerModule.setup('api', app, document); // <- passer le document, pas une fonction

  // Port
  await app.listen(process.env.PORT ?? 8001);
  console.log(`Server running on http://localhost:${process.env.PORT ?? 8001}`);
}
bootstrap();
