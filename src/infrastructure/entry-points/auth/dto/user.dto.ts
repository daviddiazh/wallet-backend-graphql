import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { IUser } from '../../../../domain/common/user/user.interface';

export class CreateUserDto implements IUser {
    
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

    @IsNotEmpty()
    clientState?: number;

    @IsString()
    @IsOptional()
    profilePicture?: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}