import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Schema } from 'mongoose';
import { IAccount } from './account.interface';

export class AccountDto implements IAccount {

    @IsOptional()
    @IsMongoId()
    _id?: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId()
    userId: Schema.Types.ObjectId;

    @IsOptional()
    @IsNumber()
    balance?: number;

    @IsOptional()
    @IsNumber()
    credit?: number;

    @IsOptional()
    @IsNumber()
    state?: number;

}