import Grid from './Grid';
import Player from './Player';
import { createRandomTetromino } from './Tetromino';

class Game {
    #lastFrame = 0;
    #dropCount = 0;
    #dropInterval = 1000; // 1 second
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
        this.#dropCount += deltaTime;

        if (this.#dropCount > this.#dropInterval) {
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

    drop() {
        this.#player.position.y++;

        if (this.#grid.collision()) {
            this.#player.position.y--;
            this.#grid.merge();
            this.resetPlayer();
        }

        this.#dropCount = 0;
    }

    rotate() {
        let offset = 1;
        const position = this.#player.position.x;

        this.#player.rotate();

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

    resetPlayer() {
        const current = createRandomTetromino(this.ctx);

        this.#player.tetrimino = current;
        this.#player.position = {
            x:
                Math.floor(this.#grid.matrix[0].length / 2) -
                Math.floor(this.#player.matrix[0].length / 2),
            y: 0,
        };

        if (this.#grid.collision()) {
            this.#grid.reset();
        }
    }
}

export default Game;
