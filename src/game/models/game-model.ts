import mongoose, { Schema, Types } from 'mongoose';
import { IGameDocument } from '../interfaces/game-document-interface';

const gameSchema: Schema = new Schema({
    user: { type: Types.ObjectId, ref: 'User' },
    outcomes: { type: Array },
    maxInside: { type: Number },
    minInside: { type: Number },
    maxOutside: { type: Number },
    minOutside: { type: Number },
    profit: { type: Number },
    won: { type: Boolean },
    rounds: { type: Number },
    bets: { type: Number },
    startBalance: { type: Number }
}, { timestamps: true });

export const Game = mongoose.model<IGameDocument>('Game', gameSchema)
