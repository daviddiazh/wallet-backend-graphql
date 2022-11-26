import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Schema } from 'mongoose';
import { IMovement } from './movement.interface';

export class MovementDto implements IMovement {

    @IsOptional()
    @IsMongoId()
    _id?: Schema.Types.ObjectId;

    @IsNotEmpty()
    accountId_Income: Schema.Types.ObjectId | string;

    @IsNotEmpty()
    accountId_Outcome: string | Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    reason: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(5000)
    amount: number;

    @IsOptional()
    @IsNumber()
    fees?: number;

}