import { User } from "./user-model"
import { IUser } from "../interfaces/user-model-interface"
import { IUserDocument } from "../interfaces/user-document-interface"

export const create = async (userData: IUser): Promise<IUserDocument> => await User.create(userData)

export const all = async (): Promise<IUserDocument[]> => await User.find({})

export const get = async (userId: string): Promise<IUserDocument | null> => await User.findById(userId)

export const findOneBy = async(field: {}): Promise<IUserDocument | null> => await User.findOne(field)