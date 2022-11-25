import { Schema } from "mongoose";

export interface IUser {
    _id?: Schema.Types.ObjectId;
    fullName: string;
    email: string;
    phone?: string; 
    profilePicture?: string;
    password?: string;
    clientState?: number;
}