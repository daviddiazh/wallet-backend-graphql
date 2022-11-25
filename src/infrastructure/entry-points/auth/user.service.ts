import { Injectable } from '@nestjs/common';
import { UserDBRepository } from '../../driven-adapters/mongo-adapter/user/user.repository';
import { User } from './entities/user.entity';
import { IUserDBRepository } from './user.repository.types';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService implements IUserDBRepository {

    constructor(
        private readonly user: UserDBRepository
    ){}

    create(payload: CreateUserDto): Promise<User> {
        return this.user.create(payload);
    }

    findById(id: string): Promise<User> {
        return this.user.findById(id);
    }

    findByName(name: string, lastName: string): Promise<User[]> {
        return this.user.findByName(name, lastName);
    }

    findByEmail(email: string): Promise<User> {
        return this.user.findByEmail(email);
    }

    findAll(): Promise<User[]> {
        return this.user.findAll();
    }

    updateRole(id: string, role: string): Promise<User> {
        return this.updateRole(id, role);
    }

    delete(id: string): Promise<void> {
        return this.user.delete(id);
    }
  
}
