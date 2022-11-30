import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { IAccountDBRepository } from './account.repository.types';
import { AccountDBRepository } from 'src/infrastructure/driven-adapters/mongo-adapter/account/account.repository';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService implements IAccountDBRepository {

  constructor(
    private readonly accountRepository: AccountDBRepository
  ){}

  create(createAccountDto: CreateAccountDto) {
    return this.accountRepository.create(createAccountDto);
  }

  findById(id: string) {
    return this.accountRepository.findById(id);
  }

  findByUserId(id: string) {
    return this.accountRepository.findByUserId(id);
  }

  findByUserEmail(email: string) {
    return this.accountRepository.findByUserEmail(email);
  }
  
  updateBalance(accountId: string, newBalance: number): Promise<Account> {
    return this.accountRepository.updateBalance(accountId, newBalance);
  }

}
