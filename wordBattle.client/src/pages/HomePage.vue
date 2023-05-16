<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 mt-2">
        <h1>Word Battle</h1>
      </div>
    </div>
  </div>

  <div v-if="!account.id" class="container-fluid">
    <div class="row">
      <div class="col-12 mt-5 text-center">
        <h1 class="bg-light rounded border border-dark bodrder-2 p-4">Please Log In</h1>
      </div>
    </div>
  </div>

  <div v-else class="container-fluid">

    <!-- SECTION account info -->
    <div class="row my-3 align-items-center">
      <div class="col-4">
        <img :src="account.picture" :alt="account.name"
          class="img-fluid rounded-circle border border-dark border-2 elevation-3">
      </div>
      <div class="col-8 p-3">
        <h2 class="mb-3 text-center">
          {{ account.name }}
        </h2>
        <div class="d-flex justify-content-between">
          <h3 class="text-center">
            Won
            <br>
            {{ account.gamesWon }}
          </h3>
          <h3 class="text-center">
            Played
            <br>
            {{ account.gamesPlayed }}
          </h3>
        </div>
      </div>
    </div>

    <!-- SECTION nav buttons -->
    <div class="row">
      <div class="col-12 text-center mb-3">
        <router-link :to="{ name: 'Games' }">
          <button class="btn btn-primary w-100 py-3">
            <h4 class="m-0">My Games</h4>
          </button>
        </router-link>
      </div>
      <div class="col-12 text-center mb-3">
        <router-link :to="{ name: 'Friends' }">
          <button class="btn btn-primary w-100 py-3">
            <h4 class="m-0">Friends</h4>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">
h1,
h2,
h3 {
  color: whitesmoke;
  text-shadow: .04em .04em black;
}
</style>
