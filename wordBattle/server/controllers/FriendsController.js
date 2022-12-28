import { Auth0Provider } from "@bcwdev/auth0provider";
import { friendsService } from "../services/FriendsService.js";
import BaseController from "../utils/BaseController.js";

export class FriendsController extends BaseController {
  constructor () {
    super('api/friends')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createFriend)
      .delete('/:friendId', this.removeFriend)
  }
  async createFriend(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const friend = await friendsService.createFriend(req.body)
      return res.send(friend)
    } catch (error) {
      next(error)
    }
  }
  async removeFriend(req, res, next) {
    try {
      const message = await friendsService.removeFriend(req.params.friendId, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}