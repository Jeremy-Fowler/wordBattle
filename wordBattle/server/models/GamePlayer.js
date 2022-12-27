import { Schema } from "mongoose";
import { TileSchema } from "./Game.js";

export const GamePlayerSchema = new Schema(
  {
    playerId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    gameId: { type: Schema.Types.ObjectId, required: true, ref: 'Game' },
    score: { type: Number, required: true, default: 0 },
    playerTiles: { type: [TileSchema] },
    turnPass: { type: Boolean, required: true, default: false },
    accepted: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

GamePlayerSchema.virtual('player', {
  localField: 'playerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

GamePlayerSchema.index({ playerId: 1, gameId: 1 }, { unique: true })