<template>
  <div class="home">
    <app-bar />
    <main>
      <game ref="game" :isPaused="isPaused" @gameover="onGameOver" />
      <div>
        <b-button
          type="is-primary"
          class="mt-3 mb-6"
          expanded
          @click="onNewGame"
        >
          New Game
        </b-button>
        <h3 class="subtitle is-1" v-if="isGameOver">Game Over!</h3>
      </div>
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

  data() {
    return {
      isPaused: true,
      isGameOver: false,
    };
  },

  methods: {
    onNewGame() {
      this.$refs.game.restart();
      this.isPaused = false;
      this.isGameOver = false;
    },

    onGameOver() {
      this.isPaused = true;
      this.isGameOver = true;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 240px;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 1.4rem;
  padding-bottom: 1.4rem;
}

h3 {
  font-family: "VT323";
}
</style>
