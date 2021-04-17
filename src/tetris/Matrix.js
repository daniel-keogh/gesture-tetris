class Matrix {
    /**
     * Creates a new matrix object.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     * @param {Number[][]} matrix Defines how the shape looks. `N > 0` denotes a block and `0` denotes an empty space.
     */
    constructor(ctx, matrix) {
        this.ctx = ctx;
        this.matrix = matrix;
    }

    /**
     * Draws a matrix to the canvas.
     * @param {{x: Number, y: Number}} offset Denotes the shape's offset from the top-left of the canvas.
     */
    draw(offset) {
        this.matrix.forEach((row, y) => {
            row.forEach((col, x) => {
                if (col !== 0) {
                    this.ctx.fillStyle = Matrix.getColourByValue(col);
                    this.ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    /**
     * Rotate this object.
     * @param {Number} direction Determines the direction to rotate in.
     */
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

    static getColourByValue(value) {
        const colours = [
            null,
            '#A000F0',
            '#F0F000',
            '#0000F0',
            '#F0A000',
            '#00F0F0',
            '#00F000',
            '#F00000',
        ];
        return colours[value];
    }
}

export default Matrix;
