import { Schema } from "mongoose";

export interface IAccount {
    _id?: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    userEmail: string;
    balance?: number;
    credit?: number;
    state?: number;
    createdAt?: Date | number | string;
    updatedAt?: Date | number | string;
}
