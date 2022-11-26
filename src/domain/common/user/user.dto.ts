import { Schema } from 'mongoose';
import { IUser } from './user.interface';
import { IsString, IsMongoId, IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UserDto implements IUser {

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsNumber()
    @IsOptional()
    phone: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @IsNotEmpty()
    clientState?: number;

    @IsString()
    @IsOptional()
    profilePicture?: string;

}