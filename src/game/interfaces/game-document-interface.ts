import { IGame } from "./game-model-interface";
import { Document } from "mongoose";

export interface IGameDocument extends IGame, Document {}
