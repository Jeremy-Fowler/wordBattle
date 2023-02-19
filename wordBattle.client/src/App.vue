<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

body {
  background-image: url(https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
  background-size: cover;
}
</style>
