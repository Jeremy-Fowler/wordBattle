import { Schema } from "mongoose";

export const MessageSchema = new Schema({
  gameId: { type: Schema.Types.ObjectId, required: true, ref: 'Game' },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  body: { type: String, required: true, minlength: 1, maxlength: 100 },
},
  { timestamps: true, toJSON: { virtuals: true } }
)

MessageSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})