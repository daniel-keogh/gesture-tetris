import Player from './Player';
import { TShape } from './Tetromino';
import { Colour } from './Utils';

class Game {
    #lastFrame = 0;
    #dropCount = 0;
    #dropInterval = 1000; // 1 second
    #player = null;
    #current = null;
    #gameWindow = [];

    /**
     * Creates a new game.
     * @param {CanvasRenderingContext2D} ctx A canvas context.
     */
    constructor(ctx) {
        this.ctx = ctx;
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;
    }

    start() {
        this.ctx.fillStyle = Colour.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.scale(20, 20);

        this.#current = new TShape(this.ctx);
        this.#player = new Player({ x: 0, y: 0 }, this.#current.matrix);
        this.#gameWindow = GameWindow.create(12, 20);

        // Start update loop
        this.update();
    }

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
        this.#current.draw(this.#player.position);
    }

    /**
     * Handle a keyboard event.
     * @param {KeyboardEvent} event
     */
    input(event) {
        switch (event.key) {
            case 'ArrowLeft':
                this.#player.position.x--;
                break;
            case 'ArrowRight':
                this.#player.position.x++;
                break;
            case 'ArrowDown':
                this.drop();
                break;
            default:
                break;
        }
    }

    drop() {
        this.#player.position.y++;
        this.#dropCount = 0;
    }
}

class GameWindow {
    static create(width, height) {
        const matrix = [];

        while (height--) {
            matrix.push(new Array(width).fill(0));
        }

        return matrix;
    }
}

export default Game;
