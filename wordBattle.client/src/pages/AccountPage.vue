<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { gamesService } from '../services/GamesService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default {
  setup() {
    async function getGameById() {
      try {
        await gamesService.getGameById()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getGameById()
    })
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
