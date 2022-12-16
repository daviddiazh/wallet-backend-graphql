import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, NotFoundException, ServiceUnavailableException, HttpStatus, HttpException } from '@nestjs/common';
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
            switch(error.status) {
                case 400: 
                    throw error;
                default:
                    throw new HttpException('Estamos presentando fallas en nuestro servicio.', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
   }

    /**
     * Find a User
     * @body id
     * @return user found - The user found
    */
   async findById (id: string): Promise<User> {
        try {
            const user = await this.userModel.findById(id);

            if ( !user ) {
                throw new NotFoundException('Usuario no encontrado');
            }

            let newObjectUser = user;
            newObjectUser = newObjectUser.toObject();
            delete newObjectUser.password;

            return newObjectUser;
        } catch (error) {
            switch(error.status) {
                case 404: 
                    throw error;
                default:
                    throw new HttpException('Estamos presentando fallas en nuestro servicio.', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
   }

    /**
     * Find a User
     * @body phone
     * @return user by phone found - The user found
    */
    async findByPhone (phone: number): Promise<User> {
        try {
            const users: any = await this.userModel.findOne({phone});

            if ( !users ) {
                throw new NotFoundException('Usuario no encontrado');
            }

            let newObjectUsers = users;
            const returnUsers = newObjectUsers.map(user => {
                const { _doc: { password, ...userData } } = user;
                
                return userData
            });

            return returnUsers;
        } catch (error) {
            switch(error.status) {
                case 404: 
                    throw error;
                default:
                    console.log('Down Service in FindByName method on Repository - ADAPTER');
                    throw new HttpException('Estamos presentando fallas en nuestro servicio.', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
   }

    /**
     * Find a User
     * @body email
     * @return user by email found - The user found
    */
    async findByEmail (email: string): Promise<any> {
        try {
            const user = await this.userModel.findOne({email});

            if ( !user ) {
                throw new BadRequestException('Correo y/o contraseña incorrectos');
            }

            return user;
        } catch (error) {
            switch(error.status) {
                case 400: 
                console.log('error', error)
                    throw error;
                default:
                    throw new HttpException('Estamos presentando fallas en nuestro servicio.', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
   }

   /**
     * Find a User
     * @return users found - The users found
    */
    async findAll (): Promise<User[]> {
        try {
            const users: any = await this.userModel.find().exec();

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
            throw new ServiceUnavailableException(`Down Service in findAll method: ${error.message}`);
        }
   }

   /**
     * Update a User's picture
     * @params id, role
     * @return user's picture update - The user's picture update
    */
    async updatePicture (id: string, picture: string): Promise<User> {
        try {
            const user = await this.userModel.findOneAndUpdate({id, profilePicture: picture});

            if ( !user ) {
                //TODO: make error
            }

            return user;
        } catch (error) {
            //TODO: make error
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