import { Schema } from "mongoose";

export interface IUser {
    _id?: Schema.Types.ObjectId;
    fullName: string;
    email: string;
    phone: number; 
    profilePicture?: string;
    password?: string;
    clientState?: number;
}