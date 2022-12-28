import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class FriendsService {
  createFriend(body) {
    throw new Error("Method not implemented.");
  }
  async removeFriend(friendId, userId) {
    const friend = await this.getFriendById(friendId, userId)
    await friend.remove()
    return 'Friendship ended'
  }

  async getFriendById(friendId, userId) {
    const friend = await dbContext.Friends.findById(friendId)
    if (!friend) {
      throw new BadRequest('No friend found')
    }
    if (friend.accountId != userId || friend.userId != userId) {
      throw new Forbidden('Not your friendship')
    }
    return friend
  }

}

export const friendsService = new FriendsService()