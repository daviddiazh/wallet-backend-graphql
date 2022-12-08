import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./user.entity";

@ObjectType()
export class SignUpOrLogin {

    @Field( () => User )
    user: User;

    @Field( () => String )
    token: string;
}