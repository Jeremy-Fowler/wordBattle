import { Schema } from "mongoose";

export const TileSchema = new Schema(
  {
    letter: { type: String, minlength: 1, maxlength: 1, required: true },
    points: { type: Number, min: 1, max: 10, required: true },
    playerTile: { type: Boolean, required: true, default: false }
  }
)

export const PreviousWordSchema = new Schema(
  {
    word: { type: String, minlength: 1, maxlength: 1, required: true },
    points: { type: Number, min: 1, required: true },
    playerId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export const GameSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    title: { type: String, required: true, minlength: 3, maxlength: 20 },
    gameTiles: { type: [TileSchema], required: false, maxlength: 107 },
    playerIds: { type: [Schema.Types.ObjectId], maxlength: 4, minlength: 2, required: true, ref: 'Account' },
    currentWord: { type: [TileSchema], required: false, minlength: 3, maxlength: 7 },
    previousWords: { type: [PreviousWordSchema], },
    started: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

PreviousWordSchema.virtual('player', {
  localField: 'playerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

GameSchema.virtual('players', {
  localField: 'playerIds',
  foreignField: '_id',
  ref: 'Account'
})