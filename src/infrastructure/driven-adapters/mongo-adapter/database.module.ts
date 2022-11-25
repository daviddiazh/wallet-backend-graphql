import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/application/config';
import { UserSchema } from './user/user.schema';
import { UserDBRepository } from './user/user.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { url } = configService.mongo;

        return { uri: url }
      },
      inject: [config.KEY]
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      },
      
    ])
  ],
  providers: [ UserDBRepository ],
  exports: [ MongooseModule, UserDBRepository, ]
})
export class DatabaseModule {}
