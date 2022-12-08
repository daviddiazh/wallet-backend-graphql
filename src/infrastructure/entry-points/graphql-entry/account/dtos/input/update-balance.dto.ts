import { Field, ID, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateBalanceDto {

    @Field( () => ID )
    @IsNotEmpty()
    accountId: string;
    
    @Field( () => Int )
    @IsNotEmpty()
    // @IsInt()
    newBalance: number

}