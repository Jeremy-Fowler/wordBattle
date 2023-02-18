import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class FriendshipsService {
  async acceptFriendshipRequest(friendshipId, userId) {
    const friendship = await this.getFriendshipById(friendshipId, userId)
  }
  createFriendship(body) {
    throw new Error("Method not implemented.");
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