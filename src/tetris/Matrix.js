import { Colour } from './Utils';

class Matrix {
    /**
     * Create a new matrix shape.
     *
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     * @param {Number[][]} matrix Defines how the shape looks. A `1` denotes a colour and `0` denotes an empty space.
     * @param {string} colour The shape's colour.
     */
    constructor(ctx, matrix, colour = Colour.random()) {
        this.ctx = ctx;
        this.matrix = matrix;
        this.colour = colour;
    }

    /**
     * Draws a shape to the canvas context.
     * @param {{x: Number, y: Number}} offset Denotes the shape's offset from the top-left of the canvas.
     */
    draw(offset) {
        this.matrix.forEach((row, y) => {
            row.forEach((col, x) => {
                if (col !== 0) {
                    this.ctx.fillStyle = this.colour;
                    this.ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    rotate(direction) {
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < y; x++) {
                [this.matrix[x][y], this.matrix[y][x]] = [
                    this.matrix[y][x],
                    this.matrix[x][y],
                ];
            }
        }

        if (direction > 0) {
            this.matrix.forEach((row) => row.reverse());
        } else {
            this.matrix.reverse();
        }
    }
}

export default Matrix;
