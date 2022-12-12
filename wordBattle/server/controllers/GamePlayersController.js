import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { gamePlayersService } from "../services/GamePlayersService.js";

export class GamePlayersController extends BaseController {
  constructor () {
    super('api/gameplayers')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
  }
}