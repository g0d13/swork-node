import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
    // cors: true,
  });

  app.setGlobalPrefix('api');
  app.enableCors({ allowedHeaders: '*' });

  const config = new DocumentBuilder()
    .setTitle('SWorkAPI')
    .setDescription('SWork api')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3030);
}
bootstrap();
