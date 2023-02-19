<template>
  <div @click="createFriendShip()"
    class="p-3 bg-light rounded elevation-5 border border-dark border-2 d-flex justify-content-between align-items-center bg-wood selectable">
    <img :src="profile.picture" :alt="profile.name" class="img-fluid rounded-circle">
    <div class="p-1">
      <h2>
        {{ profile.name }}
      </h2>
      <div class="d-flex justify-content-between">
        <h3 :title="`Games won: ${profile.gamesWon}`">
          {{ 'W-' + profile.gamesWon }}
        </h3>
        <h3 :title="`Games played: ${profile.gamesPlayed}`">
          {{ 'G-' + profile.gamesPlayed }}
        </h3>
      </div>
    </div>
  </div>
</template>


<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { friendshipsService } from '../services/FriendshipsService.js'
export default {
  props: {
    profile: {
      required: true,
      type: Object
    }
  },
  setup(props) {
    return {
      async createFriendShip() {
        try {
          if (await Pop.confirm(`Do you want to send ${props.profile.name} a friend request?`)) {
            await friendshipsService.createFriendShip(props.profile._id)
          }
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 10vh;
}

.bg-wood {
  background-image: url(https://images.unsplash.com/photo-1596016743189-b9ef1d81f3dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80);
  background-size: cover;
}
</style>