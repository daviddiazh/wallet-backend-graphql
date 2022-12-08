import { Module } from '@nestjs/common';
import { MovementResolver } from './movement.resolver';
import { MovementService } from '../../movement/movement.service';

@Module({
  providers: [ MovementResolver, MovementService ]
})
export class MovementModule {}
