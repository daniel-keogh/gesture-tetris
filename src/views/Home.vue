<template>
  <div class="home">
    <app-bar />
    <main class="mx-2">
      <div class="game-container">
        <game ref="game" :isPaused="isPaused" @gameover="onGameOver" />
        <div>
          <b-button
            type="is-primary"
            class="mt-3 mb-5"
            expanded
            @click="onNewGame"
          >
            New Game {{ isPaused ? "👍" : "" }}
          </b-button>
          <h3
            class="retro-title subtitle is-1 has-text-centered"
            v-if="isGameOver"
          >
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
import { Gestures } from "fingerpose";

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

  created() {
    // Listen for a "thumbs-up" gesture to start the game
    GestureEventBus.$on("on-detection", ({ name }) => {
      if (name === Gestures.ThumbsUpGesture.name && this.isPaused) {
        this.onNewGame();
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
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
