import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';
import { IUser } from '../../../../domain/common/user/user.interface';

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

export class UserSpec extends Document implements IUser {

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    fullName: string;
   
   @Prop({
        type: Number,
        required: true,
        trim: true,
    })
   phone: number;

   @Prop({
        type: String,
        required: true,
        trim: true,
        unique: true
    })
   email: string;

   @Prop({
        type: String,
        required: true,
        trim: true,
    })
   password: string;

   @Prop({
        type: Number,
        required: false,
        trim: true,
    })
    clientState?: number;

   @Prop({
        type: String,
        trim: true,
        required: false,
        default: 'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png'
   })
   profilePicture?: string;

}

export const UserSchema = SchemaFactory.createForClass(UserSpec);