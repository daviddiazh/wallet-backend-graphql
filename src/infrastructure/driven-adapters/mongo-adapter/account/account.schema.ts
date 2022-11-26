import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';
import { IAccount } from '../../../../domain/common/account/account.interface';

@Schema({
    toJSON: {
        virtuals: true,
        transform: function( doc: any, ret: any ) {
            // delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
    timestamps: true,
})

export class AccountSpec extends Document implements IAccount {
   
    @Prop({
        type: SchemaMongoose.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'User'
    })
    userId: SchemaMongoose.Types.ObjectId;

    @Prop({
        type: Number,
        required: false,
        trim: true,
        default: 1000000
    })
    balance?: number;

    @Prop({
        type: Number,
        required: false,
        trim: true,
    })
    credit?: number;

    @Prop({
        type: Number,
        required: false,
        trim: true,
        default: 0
    })
    state?: number;

}

export const AccountSchema = SchemaFactory.createForClass(AccountSpec);