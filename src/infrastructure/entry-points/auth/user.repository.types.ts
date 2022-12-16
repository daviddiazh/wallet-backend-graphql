import { HttpStatus } from '@nestjs/common';
import { UserDto } from '../../../domain/common/user/user.dto';
import { User } from './entities/user.entity';

export abstract class IUserDBRepository {
    abstract create(payload: UserDto): Promise<User>;
    abstract findById(id: string): Promise<User>;
    abstract findByPhone(phone: number): Promise<User>;
    abstract findByEmail(email: string): Promise<any>;
    abstract findAll(): Promise<User[]>;
    abstract updatePicture(id: string, picture: Express.Multer.File | string): Promise<any>;
    abstract delete(id: string): Promise<void>;
}