import * as bcrypt from 'bcrypt';
import { IHashTypesRepository } from '../../../domain/types-adapters/hash-password.repository.types';

export class HashRepository implements IHashTypesRepository {

    async hash(password: string) {
        const hash = await bcrypt.hash(password, 10);
        // console.log('hash - ADAPTER: ', hash);
        
        return hash;
    }

    async compare(password: string, encryptedPassword: string){
        const isMatch = await bcrypt.compare(password, encryptedPassword);
        // console.log('isMatch - ADAPTER: ', isMatch)

        return isMatch;
    }

}
