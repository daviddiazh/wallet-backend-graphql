import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmpty, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class SignUpDto {

    @Field( () => String )
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @Field( () => String )
    @IsNotEmpty()
    @IsString()
    email: string;

    @Field( () => String )
    @IsNotEmpty()
    @IsString()
    password: string;

    @Field( () => Int )
    @IsNotEmpty()
    @IsInt()
    phone: number;

    @Field( () => Int, { nullable: true } )
    @IsOptional()
    @IsInt()
    clientState?: number;

    @Field( () => String, { nullable: true } )
    @IsOptional()
    @IsString()
    profilePicture?: string;

}