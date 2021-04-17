<template>
  <div>
    <canvas ref="gameCanvas" :height="height" :width="width"></canvas>
  </div>
</template>

<script>
import Game from "../tetris/Game";

export default {
  name: "Game",

  data() {
    return {
      height: 400,
      width: 240,
    };
  },

  mounted() {
    const canvas = this.$refs.gameCanvas;
    const ctx = canvas.getContext("2d");

    // Start the game
    const game = new Game(ctx);
    game.start();

    window.addEventListener("keydown", (e) => game.input(e));
  },
};
</script>

<style lang="scss" scoped></style>
