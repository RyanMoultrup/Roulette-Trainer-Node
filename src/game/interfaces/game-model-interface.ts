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
    outcomes: IOutcome[]
}
