<template>
  <div id="app">
    <template v-if="!modelLoaded">
      <loading message="👋 Loading hand detection model..." />
    </template>
    <template v-else>
      <router-view />
    </template>

    <camera v-show="modelLoaded" @on-loaded="modelLoaded = true" />
  </div>
</template>

<script>
import Camera from "@/components/Camera.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "App",

  components: {
    Camera,
    Loading,
  },

  data() {
    return {
      modelLoaded: false,
    };
  },
};
</script>

<style lang="scss">
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.retro-title {
  font-family: "VT323", monospace;
}
</style>
