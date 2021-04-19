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
   */
  draw(offset) {
    this.matrix.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col !== 0) {
          const shape = [x + offset.x, y + offset.y, 1, 1];
          this.ctx.fillStyle = Matrix.getColourByValue(col);
          this.ctx.strokeStyle = '#f1f1f1';
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
      '#D8247C', // purple
      '#FAEB2C', // yellow
      '#1685F8', // blue
      '#FF7D3C', // orange
      '#25A9F0', // cyan
      '#38FF12', // green
      '#F62D47', // red
    ];
    return colours[value];
  }
}

export default Matrix;
