import { Colour } from './Utils';

class Tetromino {
    #colour = Colour.random();

    /**
     * Create a new shape.
     *
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     * @param {Number[][]} matrix Defines how the shape looks. A `1` denotes a colour and `0` denotes an empty space.
     */
    constructor(ctx, matrix) {
        this.ctx = ctx;
        this.matrix = matrix;
    }

    /**
     * Draws the shape to the canvas context.
     * @param {{x: Number, y: Number}} offset Denotes the offset from the top-left of the canvas.
     */
    draw(offset) {
        this.matrix.forEach((row, y) => {
            row.forEach((col, x) => {
                if (col !== 0) {
                    this.ctx.fillStyle = this.#colour;
                    this.ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }
}

class TShape extends Tetromino {
    /**
     * Creates a T-shaped Tetromino.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
    constructor(ctx) {
        super(ctx, [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ]);
    }
}

export { TShape };
