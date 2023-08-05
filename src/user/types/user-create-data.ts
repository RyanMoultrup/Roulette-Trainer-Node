import { IUser } from "../interfaces/user-model-interface"

export type IUserCreateData = Omit<IUser, 'id'>
