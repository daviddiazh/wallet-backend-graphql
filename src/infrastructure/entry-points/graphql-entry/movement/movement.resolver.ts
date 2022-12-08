import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MovementService } from '../../movement/movement.service';
import { RequestCreditDto } from './dtos/input/request-credit.dto';
import { RequestCredit } from './entity/request-credit.entity';
import { MoneyTransfer } from './entity/money-transfer.entity';
import { MoneyTransferDto } from './dtos/input/money-transfer.dto';

@Resolver()
export class MovementResolver {

    constructor(
        private readonly movementService: MovementService,
    ){}

    @Mutation( () => RequestCredit, { name: 'requestCredit' } )
    requestCredit(@Args('requestCredit') requestCreditDto: RequestCreditDto){
        return this.movementService.requestCredit( requestCreditDto );
    }

    @Mutation( () => MoneyTransfer, { name: 'moneyTransfer' } )
    moneyTransfer(@Args('moneyTransfer') moneyTransferDto: MoneyTransferDto) {
        return this.movementService.moneyTransfer( moneyTransferDto )
    }

}
