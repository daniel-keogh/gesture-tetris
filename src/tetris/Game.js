import Grid from './Grid';
import Player from './Player';
import { createRandomTetromino } from './Tetromino';

class Game {
    #lastFrame = 0;
    #drop = {
        previous: 0, // Amount of time since the previous drop
        interval: 1000, // 1 second
    };
    #player = null;
    #grid = null;

    /**
     * Creates a new Game instance.
     * @param {CanvasRenderingContext2D} ctx A canvas context.
     */
    constructor(ctx) {
        this.ctx = ctx;
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;
    }

    /** Starts a new game. */
    start() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.scale(20, 20);

        this.#player = new Player(createRandomTetromino(this.ctx));
        this.#grid = new Grid(this.ctx, 12, 20, this.#player);

        // Start update loop
        this.update();
    }

    /** The game's update method. Gets called on every frame. */
    update(frame = 0) {
        const deltaTime = frame - this.#lastFrame;

        this.#lastFrame = frame;
        this.#drop.previous += deltaTime;

        // Check if it's time for another drop
        if (this.#drop.previous > this.#drop.interval) {
            this.drop();
        }

        this.draw();
        requestAnimationFrame((frame) => this.update(frame));
    }

    draw() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.#grid.draw();
        this.#player.draw();
    }

    /** Moves the player left or right. */
    move(direction) {
        this.#player.position.x += direction;

        if (this.#grid.collision()) {
            this.#player.position.x -= direction;
        }
    }

    /** Handle keyboard events. */
    input(event) {
        switch (event.key) {
            case 'ArrowLeft':
                this.move(-1);
                break;
            case 'ArrowRight':
                this.move(1);
                break;
            case 'ArrowDown':
                this.drop();
                break;
            case 'r':
                this.rotate();
                break;
            default:
                break;
        }
    }

    /** Drops the player down by one space. */
    drop() {
        this.#player.position.y++;

        // Check for collisions
        if (this.#grid.collision()) {
            this.#player.position.y--;
            this.#grid.merge();
            this.resetPlayer(); // Spawn another piece

            // Update score
            this.score += this.#grid.sweep();
        }

        this.#drop.previous = 0;
    }

    /**
     * Rotate's the player's piece.
     *
     */
    rotate() {
        const position = this.#player.position.x;
        this.#player.rotate();

        // Prevent pieces from rotating outside the edge of the board
        // Reference: https://www.youtube.com/watch?v=H2aW5V46khA
        let offset = 1;
        while (this.#grid.collision()) {
            this.#player.position.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > this.#player.matrix[0].length) {
                this.#player.rotate(-1);
                this.#player.position.x = position;
                return;
            }
        }
    }

    /** Spawns a new piece. */
    resetPlayer() {
        const current = createRandomTetromino(this.ctx);

        this.#player.tetrimino = current;
        this.#player.position = {
            x: this.calculateCenter(),
            y: 0,
        };

        // if a collision happens immediately, then the grid is full
        if (this.#grid.collision()) {
            this.#grid.reset();
        }
    }

    calculateCenter() {
        return (
            Math.floor(this.#grid.matrix[0].length / 2) -
            Math.floor(this.#player.matrix[0].length / 2)
        );
    }
}

export default Game;
