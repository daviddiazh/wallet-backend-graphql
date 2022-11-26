import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { MovementDBRepository } from '../../driven-adapters/mongo-adapter/movement/movement.repository';
import { AccountDBRepository } from 'src/infrastructure/driven-adapters/mongo-adapter/account/account.repository';

@Injectable()
export class MovementService {

  constructor(
    private readonly movementRepository: MovementDBRepository,
    private readonly accountRepository: AccountDBRepository,
  ) {}

  async requestCredit(payload: any) {
    try {
      const { accountId_Income, amount, reason } = payload;
      const toUser = await this.accountRepository.findById(accountId_Income);
      
      if( !toUser ) {
        throw new NotFoundException('user ID not found, please call to bank.');
      }

      const payloadSave = {
        accountId_Income,
        accountId_Outcome: 'Bank',
        reason,
        amount,
        fees: 1.9 
      }

      const movement = await this.movementRepository.create(payloadSave);

      const newBalance = toUser.balance += amount
      const updateBalance = await this.accountRepository.updateBalance(accountId_Income, newBalance)


      return {
        movement,
        updateBalance
      };
    } catch (error) {
      throw new BadRequestException(error, 'Please sure of send a good credit request.')
    }
  }


  async moneyTransfer(payload: any) {
    try {
      const { accountId_Income, accountId_Outcome, reason, amount } = payload;

      const toUser = await this.accountRepository.findById(accountId_Income);
      const fromUser = await this.accountRepository.findById(accountId_Outcome);

      if( !toUser ) {
        throw new NotFoundException('Account ID INCOME not found to user, please call to bank.');
      }
      
      if( !fromUser ) {
        throw new NotFoundException('Account ID OUTCOME not found from user, please call to bank.');
      }

      const payloadSave: any = {
        accountId_Income,
        accountId_Outcome,
        reason,
        amount,
        fees: .6
      }

      const movement = await this.movementRepository.create(payloadSave);

      const newBalanceIncome = toUser.balance += amount;
      const savedBalanceIncome = await this.accountRepository.updateBalance(accountId_Income, newBalanceIncome);

      const newBalanceOutcome = fromUser.balance -= amount;
      const savedBalanceOutcome = await this.accountRepository.updateBalance(accountId_Outcome, newBalanceOutcome);

      return {movement, savedBalanceIncome, savedBalanceOutcome};
    } catch (error) {
      throw new BadRequestException(error, 'Please sure of send a good money transfer.')
    }
  }

  myMovementsByAccountId(id: string){
    return this.movementRepository.myMovementsByAccountId(id);
  }

}
