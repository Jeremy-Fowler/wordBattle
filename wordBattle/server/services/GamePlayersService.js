import { dbContext } from "../db/DbContext.js"

class GamePlayersService {
  createGamePlayers(gameId, playerIds) {
    playerIds.forEach(id => {
      dbContext.GamePlayers.create({ gameId: gameId, playerId: id })
    })
  }

}

export const gamePlayersService = new GamePlayersService()