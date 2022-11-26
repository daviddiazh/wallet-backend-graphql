import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';

@Module({
  controllers: [MovementController],
  providers: [MovementService]
})
export class MovementModule {}
