import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HashModule } from '../infrastructure/driven-adapters/hash-password-adapter/hash-password.module';
import { DatabaseModule } from '../infrastructure/driven-adapters/mongo-adapter/database.module';
import { UserModule } from '../infrastructure/entry-points/auth/user.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { AccountModule } from '../infrastructure/entry-points/account/account.module';
import { MovementModule } from '../infrastructure/entry-points/movement/movement.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { GraphqlEntryModule } from '../infrastructure/entry-points/graphql-entry/graphql-entry.module';

@Module({
  imports: [
    HashModule,
    DatabaseModule,
    UserModule,
    AccountModule,
    MovementModule,

    GraphqlEntryModule,

    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [
        ApolloServerPluginLandingPageLocalDefault
      ]
    }),

  ],

  controllers: [ AppController ]
})
export class AppModule {}
