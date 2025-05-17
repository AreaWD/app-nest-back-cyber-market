import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { seedCategories } from './db/seeds/category.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Cyber-market')
    .setDescription('Cyber market api')
    .setVersion('1.0')
    .addTag('API')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

  await seedCategories();
}

bootstrap();
