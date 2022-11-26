import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/application/config';
import { UserSchema } from './user/user.schema';
import { UserDBRepository } from './user/user.repository';
import { AccountSchema } from './account/account.schema';
import { AccountDBRepository } from './account/account.repository';
import { MovementSchema } from './movement/movement.schema';
import { MovementDBRepository } from './movement/movement.repository';

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
      {
        name: 'Account',
        schema: AccountSchema
      },
      {
        name: 'Movement',
        schema: MovementSchema
      }
    ])
  ],
  providers: [ UserDBRepository, AccountDBRepository, MovementDBRepository ],
  exports: [ MongooseModule, UserDBRepository, AccountDBRepository, MovementDBRepository ]
})
export class DatabaseModule {}
