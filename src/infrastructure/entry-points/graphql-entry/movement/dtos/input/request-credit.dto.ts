import { Field, ID, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';

@InputType()
export class RequestCreditDto {

    @Field( () => ID )
    @IsNotEmpty()
    accountId_Income: Schema.Types.ObjectId;
    
    @Field( () => Int )
    @IsNotEmpty()
    @IsInt()
    amount: number;
    
    @Field( () => String )
    @IsNotEmpty()
    @IsString()
    reason: string;

}