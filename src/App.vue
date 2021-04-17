<template>
  <div id="app">
    <!-- <template v-if="!modelLoaded"> -->
    <!-- <loading /> -->
    <!-- </template> -->
    <!-- <template v-else> -->
    <router-view />
    <!-- </template> -->

    <!-- <camera
      v-show="modelLoaded"
      @ondetection="onDetection"
      @onloaded="onLoaded"
    /> -->
  </div>
</template>

<script>
// import Camera from "@/components/Camera.vue";
// import Loading from "@/components/Loading.vue";

export default {
  name: "App",

  components: {
    // Camera,
    // Loading,
  },

  data() {
    return {
      modelLoaded: false,
    };
  },

  methods: {
    onDetection(gesture) {
      console.log(gesture);
    },

    onLoaded() {
      this.modelLoaded = true;
    },
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
  text-align: center;
  color: #2c3e50;
}
</style>
