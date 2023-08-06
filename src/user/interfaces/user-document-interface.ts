import { IUser } from "./user-model-interface";
import { Document } from "mongoose";

export interface IUserDocument extends IUser, Document {}