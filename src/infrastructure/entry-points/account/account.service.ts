import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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

  // credit(payload: any) {
  //   try {
  //     const { accountId, amount, reason } = payload;

  //     if( !accountId ) {
  //       throw new NotFoundException('Account ID not found, please create a new Account or call to bank.');
  //     }



  //   } catch (error) {
  //     throw new BadRequestException(error, 'Please sure of send a good credit request.')
  //   }
  // }

}
