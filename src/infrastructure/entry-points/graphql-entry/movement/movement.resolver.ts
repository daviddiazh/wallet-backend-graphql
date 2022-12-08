import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MovementService } from '../../movement/movement.service';
import { RequestCreditDto } from './dtos/input/request-credit.dto';
import { Movement } from './entity/movement.entity';
import { RequestCredit } from './entity/request-credit.entity';

@Resolver()
export class MovementResolver {

    constructor(
        private readonly movementService: MovementService,
    ){}

    @Mutation( () => RequestCredit, { name: 'requestCredit' } )
    requestCredit(@Args('requestCredit') requestCredit: RequestCreditDto){
        return this.movementService.requestCredit( requestCredit );
    }

}
