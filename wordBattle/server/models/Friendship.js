import { Schema } from "mongoose";

export const FriendshipSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  accepted: { type: Boolean, required: true, default: false }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

FriendshipSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

FriendshipSchema.virtual('friend', {
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

FriendshipSchema.index({ accountId: 1, userId: 1 }, { unique: true })
