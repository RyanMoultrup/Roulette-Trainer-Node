export interface IOutcome {
    placement: string
    category: string
    wonRound: number
    lostRound: number
    won: number
    loss: number
    bet: number
    hit: number
    color: string
    even: boolean
    bank: number
    round: number
    outcome: string
}

export interface IGame {
    user: string
    outcomes: IOutcome[]
    maxInside: number
    minInside: number
    maxOutside: number
    minOutside: number
    profit: number
    won: boolean
    rounds: number
    bets: number
    startBalance: Number
}
