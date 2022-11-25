import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, InternalServerErrorException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { Model } from "mongoose";
import { AccountSpec } from './account.schema';
import { IAccountDBRepository } from '../../../entry-points/account/account.repository.types';
import { AccountDto } from "src/domain/common/account/account.dto";
import { Account } from "src/infrastructure/entry-points/account/entities/account.entity";


export class AccountDBRepository implements IAccountDBRepository {

    constructor(
        @InjectModel('Account') private readonly accountModel: Model<AccountSpec>,
    ){}

    /**
     * Create a new Account
     * @param payload
     * @return createdAccount - The account created
    */
    async create (payload: AccountDto): Promise<Account> {
        try {
            const createdAccount = await this.accountModel.create(payload);

            return createdAccount;
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    async findById (id: string): Promise<Account> {
        try {
            const foundAccount = await this.accountModel.findOne({id}).populate('userId');

            return foundAccount;
        } catch (error) {
            this.handleExceptions(error);
        }
    }


    private handleExceptions( error: any ) {
        if ( error.code === 11000 ) {
          throw new BadRequestException(`Account exists in db ${ JSON.stringify( error.keyValue ) }`);
        }
        console.log(error);
        throw new InternalServerErrorException(`Can't create Account - Check server logs`);
      }
    
}
