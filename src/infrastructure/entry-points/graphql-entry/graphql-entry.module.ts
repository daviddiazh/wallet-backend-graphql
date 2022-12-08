import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { MovementModule } from './movement/movement.module';

@Module({
    imports: [ AccountModule, MovementModule ] 
})
export class GraphqlEntryModule {}
