import { Auth0Provider } from "@bcwdev/auth0provider";
import { gamesService } from "../services/GamesService.js";
import BaseController from "../utils/BaseController.js";

export class GamesController extends BaseController {
  constructor () {
    super('api/games')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:gameId', this.getGameById)
      .post('', this.createGame)
      .get('/:gameId/players', this.getPlayersByGameId)
  }
  getPlayersByGameId(req, res, next) {
    throw new Error("Method not implemented.");
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
  async getGameById(req, res, next) {
    try {
      const userId = req.userInfo.id
      const game = await gamesService.getGameById(req.params.gameId, userId)
      return res.send(game)
    } catch (error) {
      next(error)
    }
  }
}