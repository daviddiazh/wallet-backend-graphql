import { MovementDto } from '../../../domain/common/movement/movement.dto';
import { Movement } from './entities/movement.entity';


export abstract class IMovementDBRepository {
    abstract create(payload: MovementDto): Promise<Movement>;
    abstract findMovementById(id: string): Promise<Movement>;
    abstract myMovementsByAccountId(id: string): Promise<Movement>;
}