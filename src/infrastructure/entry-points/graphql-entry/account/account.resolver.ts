import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountService } from '../../account/account.service';
import { AccountGQL, AccountGQLFBUI } from './entities/account-gql.entity';
import { UpdateBalanceDto } from './dtos/input/update-balance.dto';
import { AccountGQLUnion, AccountGQLFBUIUnion } from '../common/unions/account';

@Resolver()
export class AccountResolver {

    constructor(
        private readonly accountService: AccountService,
    ){}

    @Query( () => AccountGQLUnion, { name: 'findById' } )
    findById(@Args('id', { type: () => ID }) id: string ) {
        return this.accountService.findById( id );
    }

    @Query( () => AccountGQLFBUIUnion, { name: 'findByUserId' } )
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
