import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { MovementModule } from './movement/movement.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ AccountModule, MovementModule, AuthModule ] 
})
export class GraphqlEntryModule {}
