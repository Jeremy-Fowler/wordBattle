<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 p-3">
        <h1>Search Friends</h1>
      </div>
      <div class="col-12 p-3">
        <form @submit.prevent="searchProfiles()">
          <div class="input-group mb-3">
            <input v-model="editable.name" type="text" class="form-control" placeholder="Friend name..."
              aria-label="Friend name..." aria-describedby="button-addon2">
            <button class="btn btn-dark" type="submit" id="button-addon2" title="Search for friends">
              <i class="mdi mdi-magnify"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-12 p-3" v-for="p in profiles">
        <ProfileCard :profile="p" />
      </div>
    </div>
  </div>
</template>


<script>
import { ref, computed } from 'vue';
import { logger } from '../utils/Logger.js';
import { profilesService } from '../services/ProfilesService.js'
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import ProfileCard from '../components/ProfileCard.vue';

export default {
  setup() {
    const editable = ref({});
    return {
      editable,
      profiles: computed(() => AppState.profiles),
      async searchProfiles() {
        try {
          await profilesService.searchProfiles(editable.value);
          editable.value = {};
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      }
    };
  },
  components: { ProfileCard }
}
</script>


<style lang="scss" scoped>
h1,
h2,
h3 {
  color: whitesmoke;
  text-shadow: .04em .04em black;
}
</style>