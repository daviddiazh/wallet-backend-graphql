import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StatusError {

    @Field( () => Int )
    code: number;

    @Field( () => String )
    title: string;
    
    @Field( () => String )
    description: string;

}