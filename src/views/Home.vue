<template>
  <div class="home">
    <app-bar />
    <main class="mx-2">
      <div class="game-container">
        <game ref="game" :isPaused="isPaused" @gameover="onGameOver" />
        <div>
          <b-button
            type="is-primary"
            class="mt-3 mb-6"
            expanded
            @click="onNewGame"
          >
            New Game {{ isPaused ? "👍" : "" }}
          </b-button>
          <h3 class="subtitle is-1 has-text-center" v-if="isGameOver">
            Game Over!
          </h3>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import Game from "@/components/Game";

import { GestureEventBus } from "../main";

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
      startMinConfidence: 8,
    };
  },

  created() {
    // Listen for a "thumbs-up" gesture to start the game
    GestureEventBus.$on("on-detection", (gesture) => {
      if (gesture.name === "thumbs_up" && this.isPaused) {
        if (gesture.confidence >= this.startMinConfidence) {
          this.onNewGame();
        }
      }
    });
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
.game-container {
  width: 360px;
  margin-top: 2%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 1.4rem;
  padding-bottom: 1.4rem;
}

h3 {
  font-family: "VT323", monospace;
}
</style>
