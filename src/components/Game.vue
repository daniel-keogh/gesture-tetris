<template>
  <div>
    <div class="score-container">
      <p class="subtitle is-3 mb-2">Score:</p>
      <p class="subtitle is-3 mb-2">{{ score }}</p>
    </div>
    <canvas ref="gameCanvas" :height="height" :width="width"></canvas>
  </div>
</template>

<script>
import { GestureEventBus } from "../main";
import { Grid, Player, createRandomTetromino } from "../tetris";
import CustomGestures from "../utils/gestures";

export default {
  name: "Game",

  props: {
    isPaused: Boolean,
  },

  data() {
    return {
      ctx: null,
      height: 560,
      width: 320,
      fillStyle: "black",

      player: null,
      grid: null,

      gridSize: {
        height: 28,
        width: 16,
      },

      drop: {
        previous: 0, // Amount of time since the previous drop
        interval: 1000, // 1 second
      },

      lastFrame: 0,
      score: 0,
    };
  },

  created() {
    // Listen for gesture events
    GestureEventBus.$on("on-detection", (gesture) => {
      this.input(gesture.name);
    });
  },

  mounted() {
    const canvas = this.$refs.gameCanvas;
    this.ctx = canvas.getContext("2d");

    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.scale(20, 20);

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

      window.addEventListener("keydown", (e) => this.input(e.key));

      // Start update loop
      this.update();
    },

    /** The game's update method. Gets called on every frame. */
    update(frame = 0) {
      const deltaTime = frame - this.lastFrame;

      this.lastFrame = frame;
      this.drop.previous += deltaTime;

      if (!this.isPaused) {
        // Check if it's time for another drop
        if (this.drop.previous > this.drop.interval) {
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

    /** Handle keyboard & gesture events. */
    input(action) {
      switch (action) {
        case "ArrowLeft":
        case CustomGestures.MoveRightGesture.name:
          this.move(-1);
          break;
        case "ArrowRight":
        case CustomGestures.MoveLeftGesture.name:
          this.move(1);
          break;
        case "ArrowDown":
        case CustomGestures.MoveDownGesture.name:
          this.dropPiece();
          break;
        case "r":
        case CustomGestures.RotateRightGesture.name:
          this.rotate();
          break;
        default:
          break;
      }
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
    rotate() {
      const position = this.player.position.x;
      this.player.rotate();

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

    calculateCenter() {
      return (
        Math.floor(this.grid.matrix[0].length / 2) -
        Math.floor(this.player.matrix[0].length / 2)
      );
    },

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
  font-family: "VT323";
}
</style>
