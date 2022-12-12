import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovementService } from '../../movement/movement.service';
import { RequestCreditDto } from './dtos/input/request-credit.dto';
import { RequestCredit } from './entity/request-credit.entity';
import { MoneyTransfer } from './entity/money-transfer.entity';
import { MoneyTransferDto } from './dtos/input/money-transfer.dto';
import { MovementsList } from './entity/movements-list.entity';
import { RequestCreditUnion, MoneyTransferUnion } from '../common/unions/movement';

@Resolver()
export class MovementResolver {

    constructor(
        private readonly movementService: MovementService,
    ){}

    @Mutation( () => RequestCreditUnion, { name: 'requestCredit' } )
    requestCredit(@Args('requestCredit') requestCreditDto: RequestCreditDto){
        return this.movementService.requestCredit( requestCreditDto );
    }

    @Mutation( () => MoneyTransferUnion, { name: 'moneyTransfer' } )
    moneyTransfer(@Args('moneyTransfer') moneyTransferDto: MoneyTransferDto) {
        return this.movementService.moneyTransfer( moneyTransferDto );
    }

    @Query( () => [ MovementsList ], { name: 'myMovementsByAccountId' } )
    myMovementsByAccountId(@Args('id') id: string) {
        return this.movementService.myMovementsByAccountId( id );
    }

}
