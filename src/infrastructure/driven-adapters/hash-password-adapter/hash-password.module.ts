import { Global, Module } from '@nestjs/common';
import { HashService } from './hash-password.service';
import { HashRepository } from './hash-password.repository';

@Global()
@Module({
  providers: [HashService, HashRepository],
  exports: [HashService],
})
export class HashModule {}
