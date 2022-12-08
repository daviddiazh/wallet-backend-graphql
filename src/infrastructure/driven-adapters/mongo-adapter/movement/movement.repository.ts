import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { MovementSpec } from './movement.schema';
import { MovementDto } from '../../../../domain/common/movement/movement.dto';
import { Movement } from '../../../entry-points/movement/entities/movement.entity';
import { IMovementDBRepository } from "src/infrastructure/entry-points/movement/movement.repository.types";


export class MovementDBRepository implements IMovementDBRepository {

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
                throw new NotFoundException('Cuenta de ahorros no encontrada')
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
            
            const foundMovementIncome = await this.movementModel.find({ accountId_Income: id }).sort({createdAt: -1});

            const foundMovementOutcome = await this.movementModel.find({ accountId_Outcome: id }).sort({createdAt: -1});

            const concatMovements = foundMovementIncome.concat(foundMovementOutcome);

            concatMovements.sort(function(a, b) {
                if (a.createdAt < b.createdAt) {
                    return 1;
                }
                if (a.createdAt > b.createdAt) {
                    return -1;
                }
            })

            const myMovementsList: any = concatMovements.map(movement => {
                const { _id, accountId_Income, accountId_Outcome, reason, amount: valor, fees, createdAt } = movement

                const amount = '$ ' + valor?.toFixed(2)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                
                return {
                    _id, 
                    accountId_Income, 
                    accountId_Outcome, 
                    reason,
                    amount,
                    fees, 
                    createdAt
                }
            });
            return myMovementsList;
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
