import { Account } from './entities/account.entity';
import { AccountDto } from '../../../domain/common/account/account.dto';


export abstract class IAccountDBRepository {
    abstract create(payload: AccountDto): Promise<Account>;
    abstract findById(id: string): Promise<Account>;
}
