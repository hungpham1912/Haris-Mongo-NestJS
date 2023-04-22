import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV_CONFIG } from './shared/constants/env.constant';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const { port, apiVersion } = ENV_CONFIG.system;

  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [apiVersion],
  });
  // Setup auto-validations
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Setup Operator Swagger
  const swagger = new DocumentBuilder()
    .setTitle('Project API')
    .setDescription('API documentation for version 1 project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swagger, {
    include: [AppModule],
  });
  SwaggerModule.setup('/docs/api', app, document);

  await app.listen(port);
  Logger.log(`Server listening on http://localhost:${port}/`);
}
bootstrap();