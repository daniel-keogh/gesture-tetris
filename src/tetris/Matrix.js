/**
 * Represents a 2x2 matrix that can be drawn to the canvas.
 */
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
     * @param {string | CanvasGradient | CanvasPattern} strokeStyle The matrix's stroke style, defaults to 'white'.
     */
    draw(offset) {
        this.matrix.forEach((row, y) => {
            row.forEach((col, x) => {
                if (col !== 0) {
                    const shape = [x + offset.x, y + offset.y, 1, 1];
                    this.ctx.fillStyle = Matrix.getColourByValue(col);
                    this.ctx.strokeStyle = 'white';
                    this.ctx.lineWidth = 0.1;
                    this.ctx.fillRect(...shape);
                    this.ctx.strokeRect(...shape);
                }
            });
        });
    }

    /** Maps each `value` to a colour. */
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
