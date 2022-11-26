import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';
import { IMovement } from '../../../../domain/common/movement/movement.interface';

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

export class MovementSpec extends Document implements IMovement {
   
    @Prop({
        type: SchemaMongoose.Types.ObjectId,
        // type: String,
        required: true,
        trim: true,
    })
    accountId_Income: SchemaMongoose.Types.ObjectId;

    @Prop({
        // type: SchemaMongoose.Types.ObjectId, String,
        type: String,
        required: true,
        trim: true,
    })
    accountId_Outcome: string | SchemaMongoose.Types.ObjectId;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    reason: string;

    @Prop({
        type: Number,
        required: true,
        trim: true,
    })
    amount: number;

    @Prop({
        type: Number,
        required: false,
        trim: true,
    })
    fees?: number;

}

export const MovementSchema = SchemaFactory.createForClass(MovementSpec);