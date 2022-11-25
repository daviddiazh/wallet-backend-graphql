import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Schema } from 'mongoose';
import { IUser } from '../../../../domain/common/user/user.interface';
import { Role } from '../../../../domain/common/user/user-role.enum';

export class CreateUserDto implements IUser {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;

    @IsString()
    @IsOptional()
    profilePicture?: string;

    @IsString()
    @IsNotEmpty()
    businessId: Schema.Types.ObjectId
    
    // @IsString()
    // @IsNotEmpty()
    // businessName: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}