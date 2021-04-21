<template>
  <div>
    <div class="score-container">
      <p class="subtitle is-3 mb-2 retro-title">Score:</p>
      <p class="subtitle is-3 mb-2 retro-title">{{ score }}</p>
    </div>
    <canvas ref="gameCanvas" :height="height" :width="width"></canvas>
  </div>
</template>

<script>
import { GestureEventBus } from "../main";
import { Grid, Player, createRandomTetromino } from "../tetris";
import CustomGestures from "../utils/gestures";
import { Gestures } from "fingerpose";

export default {
  name: "Game",

  props: {
    isPaused: Boolean,
  },

  data() {
    return {
      ctx: null,
      height: 600,
      width: 360,
      fillStyle: "#240e28",

      scale: {
        x: 30,
        y: 30,
      },

      gridSize: {
        height: 20,
        width: 12,
      },

      drop: {
        previous: 0, // Amount of time since the previous drop
        delay: 750, // 3/4 second
      },

      gestureInput: {
        previous: 0, // Amount of time since the previous gesture movement
        delay: 850, // Delay between gesture inputs
      },

      lastFrame: 0,

      player: null,
      grid: null,
      score: 0,
    };
  },

  created() {
    // Listen for gesture events
    GestureEventBus.$on("on-detection", (gesture) => {
      this.onGetureInput(gesture.name);
    });
  },

  mounted() {
    const canvas = this.$refs.gameCanvas;
    this.ctx = canvas.getContext("2d");

    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.scale(this.scale.x, this.scale.y);

    this.start();
  },

  methods: {
    /** Starts a new game. */
    start() {
      this.player = new Player(createRandomTetromino(this.ctx));
      this.grid = new Grid(
        this.ctx,
        this.gridSize.width,
        this.gridSize.height,
        this.player
      );

      this.player.position = {
        x: this.calculateCenter(),
        y: 0,
      };

      window.addEventListener("keydown", (e) => this.onInput(e.key));

      // Start update loop
      this.update();
    },

    /** The game's update method. Gets called on every frame. */
    update(frame = 0) {
      // Get time since last update
      const deltaTime = frame - this.lastFrame;

      this.lastFrame = frame;

      this.drop.previous += deltaTime;
      this.gestureInput.previous += deltaTime;

      if (!this.isPaused) {
        // Check if it's time for another drop
        if (this.drop.previous > this.drop.delay) {
          this.dropPiece();
        }

        this.draw();
      }

      requestAnimationFrame((frame) => this.update(frame));
    },

    draw() {
      this.ctx.fillStyle = this.fillStyle;
      this.ctx.fillRect(0, 0, this.width, this.height);

      this.grid.draw();
      this.player.draw();
    },

    /** Moves the player left or right. */
    move(direction) {
      this.player.position.x += direction;

      if (this.grid.collision()) {
        this.player.position.x -= direction;
      }
    },

    /** Respond to keyboard/gesture input events. */
    onInput(action) {
      switch (action) {
        case "ArrowLeft":
        case CustomGestures.PointingRightGesture.name:
          this.move(-1);
          break;
        case "ArrowRight":
        case CustomGestures.PointingLeftGesture.name:
          this.move(1);
          break;
        case "ArrowDown":
        case CustomGestures.ThumbsDownGesture.name:
          this.dropPiece();
          break;
        case "e":
        case Gestures.VictoryGesture.name:
          this.rotate(-1);
          break;
        case "r":
        case CustomGestures.PointingUpwardsGesture.name:
          this.rotate(1);
          break;
        default:
          break;
      }
    },

    /** Handle gesture events. */
    onGetureInput(action) {
      if (this.gestureInput.previous <= this.gestureInput.delay) {
        return;
      }

      this.onInput(action);

      this.gestureInput.previous = 0;
    },

    /** Drops the player down by one space. */
    dropPiece() {
      this.player.position.y++;

      // Check for collisions
      if (this.grid.collision()) {
        this.player.position.y--;
        this.grid.merge();
        this.resetPlayer(); // Spawn another piece

        // Update score
        this.score += this.grid.sweep();
      }

      this.drop.previous = 0;
    },

    /** Rotate's the player's piece. */
    rotate(direction) {
      const position = this.player.position.x;
      this.player.rotate(direction);

      // Prevent pieces from rotating outside the edge of the board
      // Reference: https://www.youtube.com/watch?v=H2aW5V46khA
      let offset = 1;

      while (this.grid.collision()) {
        this.player.position.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));

        if (offset > this.player.matrix[0].length) {
          this.player.rotate(-1);
          this.player.position.x = position;
          return;
        }
      }
    },

    /** Spawns a new piece. */
    resetPlayer() {
      const current = createRandomTetromino(this.ctx);

      this.player.tetrimino = current;
      this.player.position = {
        x: this.calculateCenter(),
        y: 0,
      };

      // if a collision happens immediately, then the grid is full
      if (this.grid.collision()) {
        this.$emit("gameover", this.score);
      }
    },

    /** Used for spawning pieces at the board's center point. */
    calculateCenter() {
      return (
        Math.floor(this.grid.matrix[0].length / 2) -
        Math.floor(this.player.matrix[0].length / 2)
      );
    },

    /** Restarts the game. */
    restart() {
      this.resetPlayer();
      this.grid.reset();
      this.score = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.score-container {
  display: flex;
  justify-content: space-between;
}
</style>
