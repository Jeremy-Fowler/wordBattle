import { dbContext } from "../db/DbContext.js"

class GamePlayersService {
  async getGamePlayersByAccountId(playerId) {
    const games = await dbContext.GamePlayers.find({ playerId })
      .populate({
        path: 'game',
        populate: {
          path: 'players'
        }
      })
    return games
  }
  async createGamePlayers(gameId, playerIds) {
    playerIds.forEach(async (id) => {
      await dbContext.GamePlayers.create({ gameId: gameId, playerId: id })
    })
  }

}

export const gamePlayersService = new GamePlayersService()