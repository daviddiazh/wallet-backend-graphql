import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { IAccount } from '../../../../../domain/common/account/account.interface';

@ObjectType()
export class AccountGQL implements IAccount {

    @Field( () => ID )
    _id?: Schema.Types.ObjectId;

    @Field( () => ID )
    userId: Schema.Types.ObjectId;

    @Field( () => String )
    userEmail: string;

    @Field( () => Int )
    balance?: number;

    @Field( () => Int )
    credit?: number;

    @Field( () => Int )
    state?: number;

    @Field( () => Date )
    createdAt?: Date | number | string;

    @Field( () => Date )
    updatedAt?: Date | number | string;

}


@ObjectType()
export class AccountGQLFBUI {

    @Field( () => ID )
    _id?: Schema.Types.ObjectId;

    @Field( () => ID )
    userId: Schema.Types.ObjectId;

    @Field( () => String )
    userEmail: string;

    @Field( () => String )
    balance?: number;

    @Field( () => Int )
    credit?: number;

    @Field( () => Int )
    state?: number;

    @Field( () => Date )
    createdAt?: Date | number | string;

    @Field( () => Date )
    updatedAt?: Date | number | string;

}