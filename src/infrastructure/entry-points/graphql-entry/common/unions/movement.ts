import { createUnionType } from "@nestjs/graphql";
import { RequestCredit } from '../../movement/entity/request-credit.entity';
import { StatusError } from '../entity/error';
import { MoneyTransfer } from '../../movement/entity/money-transfer.entity';


export const RequestCreditUnion = createUnionType({
    name: 'RequestCreditUnion',
    types: () => [ RequestCredit, StatusError] as const,
    resolveType(value) {
        // console.log(value)
        if( value.movement ) {
            return RequestCredit;
        }
        
        if( value.description ) {
            return StatusError;
        }

    }
});

export const MoneyTransferUnion = createUnionType({
    name: 'MoneyTransferUnion',
    types: () => [ MoneyTransfer, StatusError] as const,
    resolveType(value) {
        // console.log(value)
        if( value.movement ) {
            return MoneyTransfer;
        }
        
        if( value.description ) {
            return StatusError;
        }

    }
});