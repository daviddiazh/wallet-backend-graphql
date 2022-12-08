import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { AccountService } from '../../account/account.service';
import { AccountGQL, AccountGQLFBUI } from './entities/account-gql.entity';
import { UpdateBalanceDto } from './dtos/input/update-balance.dto';

@Resolver()
export class AccountResolver {

    constructor(
        private readonly accountService: AccountService,
    ){}

    @Query( () => AccountGQL, { name: 'findById' } )
    findById(@Args('id', { type: () => ID }) id: string ) {
        return this.accountService.findById( id );
    }

    @Query( () => AccountGQLFBUI, { name: 'findByUserId' } )
    findByUserId(@Args('id', { type: () => ID }) id: string) {
        return this.accountService.findByUserId( id );
    }

    @Query( () => AccountGQLFBUI, { name: 'findByUserEmail' } )
    findByUserEmail(@Args('email', { type: () => String }) email: string) {
        return this.accountService.findByUserEmail( email );
    }
    
    @Mutation( () => AccountGQL, { name: 'updateBalance' } )
    updateBalance(@Args('updateBalance') updateBalance: UpdateBalanceDto ) {
        const { accountId, newBalance } = updateBalance;

        return this.accountService.updateBalance(accountId, newBalance);
    }

}
