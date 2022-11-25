import { Injectable } from '@nestjs/common';
import { HashRepository } from './hash-password.repository';

@Injectable()
export class HashService {
  constructor(private hashRepository: HashRepository) {}

  async hash(password: string) {
    return await this.hashRepository.hash(password)
  }
  
  async compare(password: string, encryptedPassword: string) {
    return await this.hashRepository.compare(password, encryptedPassword);
  }
  
}
