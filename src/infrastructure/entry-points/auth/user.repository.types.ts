import { HttpStatus } from '@nestjs/common';
import { UserDto } from '../../../domain/common/user/user.dto';
import { User } from './entities/user.entity';

export abstract class IUserDBRepository {
    abstract create(payload: UserDto): Promise<User>;
    abstract findById(id: string): Promise<User>;
    abstract findByPhone(phone: number): Promise<User>;
    abstract findByEmail(email: string): Promise<any>;
    abstract findAll(): Promise<User[]>;
    abstract updateRole(id: string, role: string): Promise<User>;
    abstract delete(id: string): Promise<void>;
}