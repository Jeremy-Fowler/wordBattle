import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class FriendshipsService {
  async createFriendShip(userId) {
    const friendshipData = {
      userId: userId,
      accountId: AppState.account.id
    }
    const res = await api.post('api/friendships', friendshipData)
    logger.log('creating friendship', res.data)
  }

  async getMyFriendships() {
    const res = await api.get('account/friendships')
    logger.log('getting friendships', res.data)
  }
}

export const friendshipsService = new FriendshipsService()