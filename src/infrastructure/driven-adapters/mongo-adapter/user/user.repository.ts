import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { Model } from "mongoose";
import { UserSpec } from './user.schema';
import { User } from '../../../entry-points/auth/entities/user.entity';
import { UserDto } from '../../../../domain/common/user/user.dto';
import { IUserDBRepository } from '../../../entry-points/auth/user.repository.types';


export class UserDBRepository implements IUserDBRepository {

    constructor(
        @InjectModel('User') private userModel: Model<UserSpec>,
    ){}

    /**
     * Create a new User
     * @param payload
     * @return userCreated - The user created
    */
   async create (payload: UserDto): Promise<User> {
        try {
            let {email, ...userData} = payload;
            email = email.toLowerCase().trim();
            const newPayload = {email, ...userData}
            const createdUser = await new this.userModel(newPayload).save();
            
            if( !createdUser ){
                throw new BadRequestException('Error creating an User - Repository (USER MODULE)');
            }

            let newObjectUser = createdUser;
            newObjectUser = newObjectUser.toObject();
            delete newObjectUser.password;

            return newObjectUser;
        } catch (error) {
            console.log('Down Service in Create method on Repository - ADAPTER');
            throw new ServiceUnavailableException(`Down Service in create method - user: ${error.message}`);
        }
   }

    /**
     * Find a User
     * @body id
     * @return user found - The user found
    */
   async findById (id: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({id}).populate('businessId');

            if ( !user ) {
                throw new NotFoundException('Not found user by id - Repository (USER MODULE)');
            }

            let newObjectUser = user;
            newObjectUser = newObjectUser.toObject();
            delete newObjectUser.password;

            return newObjectUser;
        } catch (error) {
            console.log('Down Service in FindById method on Repository - ADAPTER');
            throw new ServiceUnavailableException(`Down Service in find by id method: ${error.message}`);
        }
   }

   /**
     * Find a User
     * @body name, lastName
     * @return user by name found - The user found
    */
    async findByName (name: string, lastName: string): Promise<User[]> {
        try {
            const users: any = await this.userModel.find({name, lastName}).populate('businessId');

            if ( !users ) {
                throw new NotFoundException('Not found user by name - Repository (USER MODULE)');
            }

            let newObjectUsers = users;
            const returnUsers = newObjectUsers.map(user => {
                const { _doc: { password, ...userData } } = user;
                
                return userData
            });

            return returnUsers;
        } catch (error) {
            console.log('Down Service in FindByName method on Repository - ADAPTER');
            throw new ServiceUnavailableException(`Down Service in findByName method: ${error.message}`);
        }
   }

   /**
     * Find a User
     * @body email
     * @return user by email found - The user found
    */
    async findByEmail (email: string): Promise<User> {
        try {
            const user: User = await this.userModel.findOne({email}).populate('businessId');

            if ( !user ) {
                throw new NotFoundException('Not found user by email - Repository (USER MODULE)');
            }

            return user;
        } catch (error) {
            console.log('Down Service in FindByName method on Repository - ADAPTER');
            throw new ServiceUnavailableException(`Down Service in findByEmail method: ${error.message}`);
        }
   }

   /**
     * Find a User
     * @return users found - The users found
    */
    async findAll (): Promise<User[]> {
        try {
            const users: any = await this.userModel.find().populate('businessId');

            if ( !users ) {
                throw new Error('Not found users - Repository (USER MODULE)');
            }
            let newObjectUsers = users;
            const returnUsers = newObjectUsers.map(user => {
                const { _doc: { password, ...userData } } = user;
                
                return userData
            });

            return returnUsers;
        } catch (error) {
            console.log('Down Service in FINDALL method on Repository - ADAPTER');
            throw new ServiceUnavailableException(`Down Service in findAll method: ${error.message}`);
        }
   }

   /**
     * Update a User's role
     * @params id, role
     * @return user's role update - The user's role update
    */
    async updateRole (id: string, role: string): Promise<User> {
        try {
            const user = await this.userModel.findOneAndUpdate({id, role});

            if ( !user ) {
                throw new NotFoundException('Not found user - Repository (USER MODULE)');
            }

            let newObjectUser = user;
            newObjectUser = newObjectUser.toObject();
            delete newObjectUser.password;

            return user;
        } catch (error) {
            console.log('Down Service in UPDATEROLE method on Repository - ADAPTER');
            throw new ServiceUnavailableException(`Down Service in updateRole method: ${error.message}`);
        }
   }

   /**
     * Delete a User
     * @params id
     * @return delete user - The user deleted
    */
    async delete (id: string): Promise<void> {
        try {
            const user = await this.userModel.findByIdAndDelete(id);

            if ( !user ) {
                throw new NotFoundException('Not found user - Repository (USER MODULE)');
            }

            return;
        } catch (error) {
            console.log('Down Service in DELETE method on Repository - ADAPTER');
            throw new ServiceUnavailableException(`Down Service in delete method: ${error.message}`);
        }
   }

}