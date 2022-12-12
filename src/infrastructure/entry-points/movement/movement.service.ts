import { Injectable, BadRequestException, NotFoundException, HttpStatus } from '@nestjs/common';
import { MovementDBRepository } from '../../driven-adapters/mongo-adapter/movement/movement.repository';
import { AccountDBRepository } from 'src/infrastructure/driven-adapters/mongo-adapter/account/account.repository';
import { Movement } from './entities/movement.entity';
import { ResponseEntity } from '../../../domain/common/response-entity';

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
        throw new NotFoundException('ID del usuario no encontrado, por favor comunicarse con el Banco')
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

      const toUser = await this.accountRepository.findByAccountId_Income(accountId_Income);
      const fromUser = await this.accountRepository.findByAccountId_Outcome(accountId_Outcome);

      if( !toUser ) {
        return new ResponseEntity(404, 'Cuenta no encontrada.', 'La cuenta de ahorros a la que le vas a transferir no se encuentra registrada en nuestro sistema.');
      }
      
      if( !fromUser ) {
        return new ResponseEntity(404, 'Cuenta no encontrada.', 'La cuenta de ahorros de la que vas a transferir no se encuentra registrada en nuestro sistema.');
      }

      const amountParsed = parseInt(amount)

      const payloadSave: any = {
        accountId_Income,
        accountId_Outcome,
        reason,
        amount: amountParsed,
        fees: .6
      }

      if( amount > fromUser.balance ) {
        // return {
        //   message: 'El monto que estás transfiriendo sobrepasa tus fondos.',
        //   code: HttpStatus.SERVICE_UNAVAILABLE
        // };
        return new ResponseEntity(400, 'Saldo insuficiente.', 'El monto que estás transfiriendo excede tus fondos.');
      }

      const movement = await this.movementRepository.create(payloadSave);

      const newBalanceIncome = toUser.balance += amount;
      const savedBalanceIncome = await this.accountRepository.updateBalance(accountId_Income, newBalanceIncome);

      const newBalanceOutcome = fromUser.balance -= amount;
      const savedBalanceOutcome = await this.accountRepository.updateBalance(accountId_Outcome, newBalanceOutcome);

      return {movement, savedBalanceIncome, savedBalanceOutcome};
    } catch (error) {
      return new ResponseEntity(404, 'Cuenta no encontrada.', 'El ID de la cuenta no se encuentra registrada.');
    }
  }

  myMovementsByAccountId(id: string){
    return this.movementRepository.myMovementsByAccountId(id);
  }

}
