import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { IAccountDBRepository } from './account.repository.types';
import { AccountDBRepository } from 'src/infrastructure/driven-adapters/mongo-adapter/account/account.repository';

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

}
