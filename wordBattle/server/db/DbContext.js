import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { FriendshipSchema } from '../models/Friendship.js';
import { GameSchema } from '../models/Game.js';
import { GamePlayerSchema } from '../models/GamePlayer.js';
import { MessageSchema } from '../models/Message.js';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Games = mongoose.model('Game', GameSchema);
  GamePlayers = mongoose.model('GamePlayer', GamePlayerSchema);
  Messages = mongoose.model('Message', MessageSchema)
  Friendships = mongoose.model('Friend', FriendshipSchema)
}

export const dbContext = new DbContext()
