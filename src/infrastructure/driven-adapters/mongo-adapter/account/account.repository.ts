import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
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
     * @return createdAccount
    */
    async create (payload: AccountDto): Promise<Account> {
        try {
            const createdAccount = await this.accountModel.create(payload);

            return createdAccount;
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    /**
     * Find an account by id
     * @param payload
     * @return found account
    */
    async findById (id: string): Promise<Account> {
        try {
            const foundAccount = await this.accountModel.findById(id);

            return foundAccount;
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    /**
     * Find all accounts by userId
     * @param id
     * @return found accounts
    */
     async findByUserId (id: string): Promise<any> {
        try {
            const foundAccount: any = await this.accountModel.findOne({userId: id});

            if( !foundAccount ) return;

            const { balance: saldo, _id, userId, createdAt, updatedAt } = foundAccount

            const balance = '$ ' + saldo?.toFixed(2)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

            return {
                balance,
                _id, 
                userId, 
                createdAt,
                updatedAt
            };
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    /**
     * Find all accounts by userEmail
     * @param email
     * @return found accounts
    */
     async findByUserEmail (email: string): Promise<any> {
        try {
            const foundAccount: any = await this.accountModel.findOne({userEmail: email});

            if( !foundAccount ) return;

            const { balance: saldo, _id, userId, createdAt } = foundAccount

            const balance = '$ ' + saldo?.toFixed(2)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

            return {
                balance,
                _id, 
                userId, 
                createdAt
            };
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    /**
     * Find an account by id and update balance
     * @param accountId, newBalance
     * @return found account and update balance
    */
     async updateBalance (accountId: string, newBalance: any): Promise<Account> {
        try {
            const foundAccount = await this.accountModel.findByIdAndUpdate(accountId, {balance: newBalance}, {new: true});

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
