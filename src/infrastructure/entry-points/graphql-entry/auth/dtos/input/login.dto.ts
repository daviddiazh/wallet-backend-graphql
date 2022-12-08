import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class LoginDtoGQL {

    @Field( () => String )
    @IsNotEmpty()
    @IsString()
    email: string;

    @Field( () => String )
    @IsNotEmpty()
    @IsString()
    password: string;

}