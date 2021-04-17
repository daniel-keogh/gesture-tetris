import Grid from './Grid';
import Player from './Player';
import { TShape } from './Tetromino';
import { Colour } from './Utils';

class Game {
    #lastFrame = 0;
    #dropCount = 0;
    #dropInterval = 1000; // 1 second
    #player = null;
    #current = null;
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
        this.ctx.fillStyle = Colour.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.scale(20, 20);

        this.#current = new TShape(this.ctx);
        this.#player = new Player(this.ctx, this.#current.matrix, {
            x: 0,
            y: 0,
        });
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
        this.ctx.fillStyle = Colour.background;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.#grid.draw({ x: 0, y: 0 });
        this.#current.draw(this.#player.position);
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
            this.#player.position.y = 0;
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
}

export default Game;
