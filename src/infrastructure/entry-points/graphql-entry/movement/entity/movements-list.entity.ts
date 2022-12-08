import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";
import { Schema } from 'mongoose';

@ObjectType()
export class MovementsList {

    @Field( () => ID )
    _id?: Schema.Types.ObjectId;

    @Field( () => ID )
    accountId_Income: Schema.Types.ObjectId;

    @Field( () => ID )
    accountId_Outcome: Schema.Types.ObjectId;

    @Field( () => String )
    reason: string;

    @Field( () => String )
    amount: string | number;

    @Field( () => Float )
    fees: number;

    @Field( () => Date )
    createdAt: any;

}
