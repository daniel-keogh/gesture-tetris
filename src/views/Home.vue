<template>
  <div class="home">
    <app-bar />
    <main></main>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";

export default {
  name: "Home",

  components: {
    AppBar,
  },
};
</script>

<style lang="scss" scoped></style>
