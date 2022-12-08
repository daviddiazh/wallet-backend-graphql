import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Schema } from "mongoose";
import { IUser } from '../../../../../domain/common/user/user.interface';

@ObjectType()
export class User implements IUser {

    @Field( () => ID )
    _id?: Schema.Types.ObjectId;

    @Field( () => ID )
    id?: Schema.Types.ObjectId;

    @Field( () => String )
    fullName: string;

    @Field( () => Int )
    phone: number;

    @Field( () => String )
    email: string;

    @Field( () => String, { nullable: true } )
    password?: string;

    @Field( () => Int )
    clientState?: number;

}