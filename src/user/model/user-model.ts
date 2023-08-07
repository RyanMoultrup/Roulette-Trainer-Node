import mongoose, { Schema } from 'mongoose';
import { IUserDocument } from '../interfaces/user-document-interface';

const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    hash: { type: String },
    salt: { type: String }
}, { timestamps: true });

export const User = mongoose.model<IUserDocument>('User', userSchema)
