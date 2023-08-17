import { Game } from "./game-model"
import { IGame, IOutcome } from "../interfaces/game-model-interface"
import { IGameDocument } from "../interfaces/game-document-interface"
import { FindByIdFunction, All } from "src/types/repository.types"

const calculateProfit = (outcomes: IOutcome[]): number => outcomes.reduce((r: number, o: IOutcome) => o.wonRound ? r += o.won : r -= o.loss, 0)

export const create = async (gameData: Partial<IGame>): Promise<IGameDocument> => {
    const outcomes = gameData.outcomes as IOutcome[]
    const profit = calculateProfit(outcomes)
    const bets = outcomes.length
    const won = profit > 0 
    return await Game.create({ profit, bets, won, ...gameData })
}

export const all: All<IGameDocument> = async () => await Game.find({})

export const get: FindByIdFunction<IGameDocument> = async gameId => await Game.findById(gameId)

export const getByUserId = async (userId: string): Promise<IGameDocument[] | []> => await Game.find({ user: userId })