import { Game } from "./game-model"
import { IGame } from "../interfaces/game-model-interface"
import { IGameDocument } from "../interfaces/game-document-interface"

export const create = async (gameData: IGame): Promise<IGameDocument> => await Game.create(gameData)

export const all = async (): Promise<IGameDocument[]> => await Game.find({})

export const get = async (gameId: string): Promise<IGameDocument | null> => await Game.findById(gameId)

export const getByUserId = async (userId: string, gameId: string): Promise<IGameDocument[] | []> => await Game.find({ user: userId })