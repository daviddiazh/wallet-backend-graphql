import { Field, ID, InputType, Int } from "@nestjs/graphql"
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Schema } from "mongoose"

@InputType()
export class MoneyTransferDto {

    @Field( () => ID )
    @IsNotEmpty()
    @IsString()
    accountId_Income: Schema.Types.ObjectId;

    @Field( () => ID )
    @IsNotEmpty()
    @IsString()
    accountId_Outcome: Schema.Types.ObjectId;
    
    @Field( () => String )
    @IsNotEmpty()
    @IsString()
    reason: string;

    @Field( () => Int )
    @IsNotEmpty()
    @IsInt()
    amount: number;

}