import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql'
import { Schema } from 'mongoose';
import { Movement } from './movement.entity';
import { AccountGQL } from '../../account/entities/account-gql.entity';

@ObjectType()
export class RequestCredit {

    @Field( () => Movement )
    movement: Movement;

    @Field( () => AccountGQL )
    updateBalance: AccountGQL

}