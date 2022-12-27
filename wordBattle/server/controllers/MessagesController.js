import { Auth0Provider } from "@bcwdev/auth0provider";
import { messagesService } from "../services/MessagesService.js";
import BaseController from "../utils/BaseController.js";

export class MessagesController extends BaseController {
  constructor () {
    super('api/messages')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createMessage)
      .delete('/:messageId', this.removeMessage)
  }
  async createMessage(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const message = await messagesService.createMessage(req.body)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
  async removeMessage(req, res, next) {
    try {
      const message = await messagesService.removeMessage(req.params.messageId, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}