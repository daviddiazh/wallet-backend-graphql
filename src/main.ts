import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  await app.listen(8080);

  console.log('🚀 Server running on port', 8080);
}
bootstrap();
