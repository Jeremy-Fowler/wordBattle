import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class GamesService {
  async getGameById() {
    const res = await api.get('api/games/' + '63966182e11806ed5ebd5c91')
    logger.log(res.data)
  }
}

export const gamesService = new GamesService()