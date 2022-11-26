import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { MovementSpec } from './movement.schema';
import { MovementDto } from '../../../../domain/common/movement/movement.dto';
import { Movement } from '../../../entry-points/movement/entities/movement.entity';
import { IMovementDBRepository } from "src/infrastructure/entry-points/movement/movement.repository.types";
import { AccountSpec } from "../account/account.schema";


export class AccountDBRepository implements IMovementDBRepository {

    constructor(
        @InjectModel('Movement') private readonly movementModel: Model<MovementSpec>,
    ){}

    /**
     * Create a new Account
     * @param payload
     * @return createdAccount - The account created
    */
    async create (payload: MovementDto): Promise<Movement> {
        try {
            const createdAccount = await this.movementModel.create(payload);

            return createdAccount;
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    /**
     * Find an movement by id
     * @param id
     * @return movement by id
    */
    async findMovementById (id: string): Promise<Movement> {
        try {
            const foundMovement = await this.movementModel.findById({id});

            if( !foundMovement ) {
                throw new NotFoundException('Account ID not found')
            }

            const { accountId_Outcome, accountId_Income, amount, reason } = foundMovement;

            return {
                accountId_Outcome, accountId_Income, amount, reason
            };
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    /**
     * Find all movements
     * @return find all movements
    */
     async myMovementsByAccountId (id: string): Promise<Movement> {
        try {
            const foundMovementIncome = await this.movementModel.find({ accountId_Income: id });
            console.log('foundMovementIncome: ', foundMovementIncome);

            const foundMovementOutcome = await this.movementModel.find({ accountId_Outcome: id });
            console.log('foundMovementOutcome: ', foundMovementOutcome);

            // const myMovements = [foundMovementIncome, foundMovementOutcome];
            // const MyMovementsSorted = myMovements.sort((a: any, b: any) => {

            // })

            return {
                foundMovementIncome,
                foundMovementOutcome
            };
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
