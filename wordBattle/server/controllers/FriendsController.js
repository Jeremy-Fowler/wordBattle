import { Auth0Provider } from "@bcwdev/auth0provider";
import { friendshipsService } from "../services/FriendsService.js";
import BaseController from "../utils/BaseController.js";

export class FriendsController extends BaseController {
  constructor () {
    super('api/friends')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createFriend)
      .put('/:friendId', this.accpetFriendRequest)
      .delete('/:friendId', this.removeFriend)
  }
  async createFriend(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const friend = await friendshipsService.createFriendship(req.body)
      return res.send(friend)
    } catch (error) {
      next(error)
    }
  }

  async accpetFriendRequest(req, res, next) {
    try {
      const friend = await friendshipsService.acceptFriendshipRequest(req.params.friendId, req.userInfo.id)
      return res.send()
    } catch (error) {
      next(error)
    }
  }
  async removeFriend(req, res, next) {
    try {
      const message = await friendshipsService.removeFriendship(req.params.friendId, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}