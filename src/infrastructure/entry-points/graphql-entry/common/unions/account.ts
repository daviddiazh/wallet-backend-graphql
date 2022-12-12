import { createUnionType } from "@nestjs/graphql";
import { StatusError } from '../entity/error';
import { AccountGQL, AccountGQLFBUI } from '../../account/entities/account-gql.entity';


export const AccountGQLUnion = createUnionType({
    name: 'AccountGQLUnion',
    types: () => [ AccountGQL, StatusError] as const,
    resolveType(value) {
        // console.log(value)
        if( value._id ) {
            return AccountGQL;
        }
        
        if( value.description ) {
            return StatusError;
        }

    }
});

export const AccountGQLFBUIUnion = createUnionType({
    name: 'AccountGQLFBUIUnion',
    types: () => [ AccountGQLFBUI, StatusError] as const,
    resolveType(value) {
        // console.log(value)
        if( value._id ) {
            return AccountGQLFBUI;
        }
        
        if( value.description ) {
            return StatusError;
        }

    },
});
