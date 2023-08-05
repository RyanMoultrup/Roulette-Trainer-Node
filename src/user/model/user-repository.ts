import { User } from "./user-model"
import { Request } from "express"
import { IUserDocument } from "../interfaces/user-document-interface"

export const create = async (req: Request): Promise<IUserDocument> => {
    return await User.create(req)
}