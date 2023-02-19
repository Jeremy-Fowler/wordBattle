import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class GamePlayersService {
  async getMyGames() {
    const res = await api.get('account/gamePlayers')
    logger.log('get my games', res.data)
  }
}

export const gamePlayersService = new GamePlayersService()