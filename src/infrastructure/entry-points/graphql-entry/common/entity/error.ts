import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StatusError {

    @Field( () => Int )
    code: number;
    
    @Field( () => String )
    description: string;

}