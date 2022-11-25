import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HashModule } from '../infrastructure/driven-adapters/hash-password-adapter/hash-password.module';
import { DatabaseModule } from '../infrastructure/driven-adapters/mongo-adapter/database.module';
import { UserModule } from '../infrastructure/entry-points/auth/user.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    HashModule,
    DatabaseModule,
    UserModule,
    UserModule,
    
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true
    }),
    ],
  controllers: [AppController]
})
export class AppModule {}
