import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"

class ProfilesService {
  async searchProfiles(query) {
    const res = await api.get('api/profiles', { params: query })
    logger.log('getting profiles', res.data)
    AppState.profiles = res.data
  }
}

export const profilesService = new ProfilesService()