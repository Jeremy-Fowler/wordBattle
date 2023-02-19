import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class FriendshipsService {

  async getFriendshipsByAccountId(accountId) {
    const friendships = await dbContext.Friendships
      .find({ $or: [{ accountId: accountId }, { userId: accountId }] }).populate('user account', 'name picture', 'name picture')
    return friendships
  }

  async acceptFriendshipRequest(friendshipId, userId) {
    const friendship = await this.getFriendshipById(friendshipId, userId)
    if (friendship.userId != userId) {
      throw new Forbidden('Cannot accpet your own friendship')
    }
    friendship.accepted = true
    await friendship.save()
    return friendship
  }

  async createFriendship(friendshipData) {
    if (friendshipData.userId == friendshipData.accountId) {
      throw new Forbidden('Cannot friend yourself')
    }
    const friendship = await dbContext.Friendships.create(friendshipData)
    await friendship.populate('user')
    return friendship
  }

  async removeFriendship(friendshipId, userId) {
    const friendship = await this.getFriendshipById(friendshipId, userId)
    await friendship.remove()
    return 'Friendship ended'
  }

  async getFriendshipById(friendshipId, userId) {
    const friendship = await dbContext.Friendships.findById(friendshipId)
    if (!friendship) {
      throw new BadRequest('No friend found')
    }
    if (friendship.accountId != userId || friendship.userId != userId) {
      throw new Forbidden('Not your friendship')
    }
    return friendship
  }

}

export const friendshipsService = new FriendshipsService()