import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { IUser } from '../../../../domain/common/user/user.interface';

export class CreateUserDto implements IUser {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsOptional()
    phone?: string;

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

    // @IsString()
    // @IsNotEmpty()
    // businessId: Schema.Types.ObjectId

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}