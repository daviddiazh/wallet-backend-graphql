import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { MovementModule } from './movement/movement.module';
import { AuthModule } from './auth/auth.module';

import { AuthControllerTEST } from './auth/auth.controller';

@Module({
    imports: [ AccountModule, MovementModule, AuthModule ],
    controllers: [ AuthControllerTEST ]
})
export class GraphqlEntryModule {}
