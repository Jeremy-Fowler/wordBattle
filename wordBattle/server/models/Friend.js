import { Schema } from "mongoose";

export const FriendSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  accepted: { type: Boolean, required: true, default: false }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

FriendSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

FriendSchema.virtual('friend', {
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

FriendSchema.index({ accountId: 1, userId: 1 }, { unique: true })
