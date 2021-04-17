class Matrix {
    /**
     * Create a new matrix shape.
     *
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     * @param {string} colour The shape's colour.
     * @param {Number[][]} matrix Defines how the shape looks. A `1` denotes a block and `0` denotes an empty space.
     */
    constructor(ctx, colour, matrix) {
        this.ctx = ctx;
        this.colour = colour;
        this.matrix = matrix;
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
