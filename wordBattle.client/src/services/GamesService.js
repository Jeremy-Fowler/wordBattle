import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class GamesService {
  async getGameById(gameId) {
    const res = await api.get(`api/games/${gameId}`)
    logger.log('get game by id', res.data)
  }
}

export const gamesService = new GamesService()