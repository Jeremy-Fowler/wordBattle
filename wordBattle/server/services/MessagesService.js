import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { gamesService } from "./GamesService.js";

class MessagesService {
  async createMessage(body) {
    await gamesService.getGameById(body.gameId, body.creatorId)
    const message = await dbContext.Messages.create(body)
    await message.populate('creator')
    return message
  }

  async removeMessage(messageId, userId) {
    const message = await this.getMessageById(messageId)
    if (message.creatorId != userId) {
      throw new Forbidden('This is not your message')
    }
    await message.remove()
    return 'Message deleted!'
  }

  async getMessageById(messageId) {
    const message = await dbContext.Messages.findById(messageId)
    if (!message) {
      throw new BadRequest('No message found')
    }
    return message
  }

  async getMessagesByGameId(gameId, userId) {
    await gamesService.getGameById(gameId, userId)
    const messages = await dbContext.Messages.find({ gameId }).populate('creator')
    return messages
  }

}

export const messagesService = new MessagesService()