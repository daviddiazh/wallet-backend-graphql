import { Schema } from 'mongoose';
import { IUser } from '../../../../domain/common/user/user.interface';

export class User implements IUser{
    _id?: Schema.Types.ObjectId;
    fullName: string;
    phone?: string;
    email: string;
    password?: string;
    clientState?: number;
}
