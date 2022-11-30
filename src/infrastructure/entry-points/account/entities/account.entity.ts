import { Schema } from 'mongoose';
import { IAccount } from '../../../../domain/common/account/account.interface';

export class Account implements IAccount {
    _id?: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    userEmail: string;
    balance?: number;
    credit?: number;
    state?: number;
    createdAt?: Date | number | string;
    updatedAt?: Date | number | string;
}
