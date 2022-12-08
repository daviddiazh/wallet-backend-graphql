import { Schema } from 'mongoose';
import { IMovement } from '../../../../domain/common/movement/movement.interface';

export class Movement implements IMovement {

    _id?: Schema.Types.ObjectId;
    accountId_Income: Schema.Types.ObjectId | string;
    accountId_Outcome: Schema.Types.ObjectId | string;
    reason: string;
    amount: number;
    fees?: number;
    createdAt?: any;
    updatedAt?: any;

}
