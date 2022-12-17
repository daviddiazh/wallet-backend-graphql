import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AccountSpec } from './account.schema';
import { IAccountDBRepository } from '../../../entry-points/account/account.repository.types';
import { AccountDto } from "src/domain/common/account/account.dto";
import { ResponseEntity } from '../../../../domain/common/response-entity';


export class AccountDBRepository implements IAccountDBRepository {

    constructor(
        @InjectModel('Account') private readonly accountModel: Model<AccountSpec>,
    ){}

    /**
     * Create a new Account
     * @param payload
     * @return createdAccount
    */
    async create (payload: AccountDto): Promise<any> {
        try {
            const createdAccount = await this.accountModel.create(payload);

            return createdAccount;
        } catch (error) {
            return new ResponseEntity(400, 'Erro al crear la cuenta.', 'Ocurrio un error al crear la cuenta, por favor comuniquese con el Banco.');
        }
    }

    /**
     * Find an account by id
     * @param payload
     * @return found account
    */
    async findById (id: string): Promise<any> {
        try {
            const foundAccount = await this.accountModel.findById(id);
            
            if( !foundAccount ) {
                return new ResponseEntity(400, 'Cuenta no encontrada.', 'El ID de la cuenta no se encuentra registrada.');
            }

            return foundAccount;
        } catch (error) {
            return new ResponseEntity(404, 'Cuenta no encontrada.', 'El ID de la cuenta no se encuentra registrada.');
        }
    }

    /**
     * Find an account by accountId_Income
     * @param payload
     * @return found account
    */
     async findByAccountId_Income (_id: string): Promise<any> {
        try {
            const foundAccount = await this.accountModel.findOne({_id});
            
            if( !foundAccount ) {
                return new ResponseEntity(400, 'Cuenta no encontrada.', 'El ID de la cuenta no se encuentra registrada.');
            }

            return foundAccount;
        } catch (error) {
            return new ResponseEntity(404, 'Cuenta no encontrada.', 'El ID de la cuenta no se encuentra registrada.');
        }
    }

    /**
     * Find an account by accountId_Outcome
     * @param payload
     * @return found account
    */
     async findByAccountId_Outcome (id: string): Promise<any> {
        try {
            const foundAccount = await this.accountModel.findById(id);
            
            if( !foundAccount ) {
                return new ResponseEntity(404, 'Cuenta no encontrada.', 'El ID de la cuenta no se encuentra registrada.');
            }

            return foundAccount;
        } catch (error) {
            // this.handleExceptions(error);
            return new ResponseEntity(400, 'Cuenta no encontrada.', 'El ID de la cuenta no se encuentra registrada.');
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

            if( !foundAccount ) return new ResponseEntity(400, 'Usuario no encontrado.', 'El ID del usuario no se encuentra registrado.');

            const { balance: saldo, _id, userId, createdAt, updatedAt } = foundAccount

            const balance = '$ ' + saldo?.toFixed(2)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

            return {
                balance,
                _id, 
                userId, 
                createdAt,
                updatedAt
            }
        } catch (error) {
            return new ResponseEntity(404, 'Cuenta no encontrada.', 'El ID del usuario no se encuentra registrado en nuestro sistema.');
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
            return new ResponseEntity(404, 'Cuenta no encontrada.', 'El email no se encuentra registrado en nuestro sistema.');
        }
    }

    /**
     * Find an account by id and update balance
     * @param accountId, newBalance
     * @return found account and update balance
    */
     async updateBalance (accountId: string, newBalance: any): Promise<any> {
        try {
            const foundAccount = await this.accountModel.findByIdAndUpdate(accountId, {balance: newBalance}, {new: true});

            return foundAccount;
        } catch (error) {
            return new ResponseEntity(500, 'Ocurrio un error.', 'Estamos presentando problemas en nuestro sistema actualmente.');
        }
    }
    
}
