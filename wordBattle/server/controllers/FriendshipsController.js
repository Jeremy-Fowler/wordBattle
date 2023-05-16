import { Auth0Provider } from "@bcwdev/auth0provider";
import { friendshipsService } from "../services/FriendshipsService.js";
import BaseController from "../utils/BaseController.js";

export class FriendshipsController extends BaseController {
  constructor () {
    super('api/friendships')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createFriend)
      .put('/:friendshipId', this.accpetFriendRequest)
      .delete('/:friendshipId', this.removeFriend)
  }
  async createFriend(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const friendShip = await friendshipsService.createFriendship(req.body)
      return res.send(friendShip)
    } catch (error) {
      next(error)
    }
  }

  async accpetFriendRequest(req, res, next) {
    try {
      const friendShip = await friendshipsService.acceptFriendshipRequest(req.params.friendshipId, req.userInfo.id)
      return res.send(friendShip)
    } catch (error) {
      next(error)
    }
  }
  async removeFriend(req, res, next) {
    try {
      const message = await friendshipsService.removeFriendship(req.params.friendshipId, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}