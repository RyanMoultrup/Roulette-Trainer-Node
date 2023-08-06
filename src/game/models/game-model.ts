import mongoose, { Schema, Types } from 'mongoose';
import { IGameDocument } from '../interfaces/game-document-interface';

const gameSchema: Schema = new Schema({
    user: { type: Types.ObjectId, ref: 'User' },
    outcomes: { type: Array },
}, { timestamps: true });

export const Game = mongoose.model<IGameDocument>('Game', gameSchema)
