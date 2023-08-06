import { User } from "./user-model"
import { IUser } from "../interfaces/user-model-interface"
import { IUserDocument } from "../interfaces/user-document-interface"

export const create = async (userData: IUser): Promise<IUserDocument> => await User.create(userData)