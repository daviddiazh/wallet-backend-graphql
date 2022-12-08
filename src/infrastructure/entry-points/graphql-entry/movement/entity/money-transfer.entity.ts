import { Field, ObjectType } from "@nestjs/graphql";
import { AccountGQL } from "../../account/entities/account-gql.entity";
import { Movement } from "./movement.entity";

@ObjectType()
export class MoneyTransfer {

    @Field( () => Movement )
    movement: Movement;

    @Field( () => AccountGQL )
    savedBalanceIncome: AccountGQL

    @Field( () => AccountGQL )
    savedBalanceOutcome: AccountGQL

}