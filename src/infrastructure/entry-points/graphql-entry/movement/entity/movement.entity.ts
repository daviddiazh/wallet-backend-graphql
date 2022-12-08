import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql'
import { Schema } from 'mongoose';

@ObjectType()
export class Movement {

    @Field( () => ID )
    _id?: Schema.Types.ObjectId;

    @Field( () => ID )
    accountId_Income: Schema.Types.ObjectId | string;
    
    @Field( () => ID )
    accountId_Outcome: Schema.Types.ObjectId | string;
    
    @Field( () => String )
    reason: string;

    @Field( () => Int )
    amount: number;

    @Field( () => Float )
    fees?: number;

    @Field( () => Date )
    createdAt?: any;

    @Field( () => Date )
    updatedAt?: any;

}