import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { friendshipsService } from '../services/FriendshipsService.js'
import { gamePlayersService } from '../services/GamePlayersService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor () {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/gameplayers', this.getGamePlayersByAccountId)
      .get('/friendships', this.getFriendshipsByAccountId)
  }



  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getGamePlayersByAccountId(req, res, next) {
    try {
      const games = await gamePlayersService.getGamePlayersByAccountId(req.userInfo.id)
      return res.send(games)
    } catch (error) {
      next(error)
    }
  }

  async getFriendshipsByAccountId(req, res, next) {
    try {
      const friendships = await friendshipsService.getFriendshipsByAccountId(req.userInfo.id)
      return res.send(friendships)
    } catch (error) {
      next(error)
    }
  }
}
