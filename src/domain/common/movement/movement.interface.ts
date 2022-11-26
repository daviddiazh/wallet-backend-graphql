import { Schema } from 'mongoose';

export interface IMovement {
    _id?: Schema.Types.ObjectId;
    accountId_Income: Schema.Types.ObjectId | string;
    accountId_Outcome: Schema.Types.ObjectId | string;
    reason: string;
    amount: number;
    fees?: number;
    createdAt?: Date | number | string;
    updatedAt?: Date | number | string;
}