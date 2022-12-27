import { Auth0Provider } from "@bcwdev/auth0provider";
import { gamesService } from "../services/GamesService.js";
import { messagesService } from "../services/MessagesService.js";
import BaseController from "../utils/BaseController.js";

export class GamesController extends BaseController {
  constructor () {
    super('api/games')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:gameId', this.getGameById)
      .get('/:gameId/messages', this.getMessagesByGameId)
      .post('', this.createGame)
  }

  async createGame(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const game = await gamesService.createGame(req.body)
      return res.send(game)
    } catch (error) {
      next(error)
    }
  }
  async getMessagesByGameId(req, res, next) {
    try {
      const messages = await messagesService.getMessagesByGameId(req.params.gameId, req.userInfo.id)
      return res.send(messages)
    } catch (error) {
      next(error)
    }
  }
  async getGameById(req, res, next) {
    try {
      const game = await gamesService.getGameByIdWithPlayers(req.params.gameId, req.userInfo.id)
      return res.send(game)
    } catch (error) {
      next(error)
    }
  }
}