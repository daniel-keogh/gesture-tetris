<template>
  <div class="home">
    <app-bar />
    <main>
      <game />
    </main>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import Game from "@/components/Game";

export default {
  name: "Home",

  components: {
    AppBar,
    Game,
  },
};
</script>

<style lang="scss" scoped></style>
