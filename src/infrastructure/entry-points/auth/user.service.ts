import { Injectable } from '@nestjs/common';
import { UserDBRepository } from '../../driven-adapters/mongo-adapter/user/user.repository';
import { User } from './entities/user.entity';
import { IUserDBRepository } from './user.repository.types';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService implements IUserDBRepository {

    constructor(
        private readonly user: UserDBRepository,
    ){}

    create(payload: CreateUserDto): Promise<User> {
        return this.user.create(payload);
    }

    findById(id: string): Promise<User> {
        return this.user.findById(id);
    }

    findByPhone(phone: number): Promise<User> {
        return this.user.findByPhone(phone);
    }

    findByEmail(email: string): Promise<User> {
        return this.user.findByEmail(email);
    }

    findAll(): Promise<User[]> {
        return this.user.findAll();
    }

    async updatePicture ( id: string, picture: string ) {
        const secureUrl = `http://localhost:8080/user/picture/getImage/${ picture }`
        const user = await this.user.updatePicture( id, secureUrl );

        return {
            id: user._id,
            secureUrl
        };
    }

    delete(id: string): Promise<void> {
        return this.user.delete(id);
    }
  
}
