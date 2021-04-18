import Matrix from "./Matrix";

class Grid extends Matrix {
  /**
   * Creates a new Grid.
   * @param {CanvasRenderingContext2D} ctx The canvas context.
   * @param {Number} width The grid's width.
   * @param {Number} height The grid's height.
   * @param {Player} player A reference to the player.
   */
  constructor(ctx, width, height, player) {
    super(ctx, []);
    this.player = player;

    // Fill the grid with zero's
    while (height--) {
      this.matrix.push(new Array(width).fill(0));
    }
  }

  /**
   * Detects a collision.
   * @returns `true` if the player has collided with something & `false` otherwise.
   */
  collision() {
    const [matrix, offset] = [this.player.matrix, this.player.position];

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (
          matrix[y][x] !== 0 &&
          (this.matrix[y + offset.y] &&
            this.matrix[y + offset.y][x + offset.x]) !== 0
        ) {
          return true;
        }
      }
    }

    return false;
  }

  /** Merge the player's position into the grid. */
  merge() {
    this.player.matrix.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col !== 0) {
          const a = y + this.player.position.y;
          const b = x + this.player.position.x;
          this.matrix[a][b] = col;
        }
      });
    });
  }

  draw() {
    super.draw({ x: 0, y: 0 });
  }

  /**
   * Sweep the filled rows.
   * Reference: https://www.youtube.com/watch?v=H2aW5V46khA
   * @returns The number of rows spept.
   */
  sweep() {
    let count = 0;

    outer: for (let y = this.matrix.length - 1; y > 0; y--) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        if (this.matrix[y][x] === 0) {
          continue outer; // row is not filled
        }
      }

      // Replace filled row(s) with zeros & push above pieces down
      const row = this.matrix.splice(y, 1)[0].fill(0);
      this.matrix.unshift(row);
      count++;
      y++;
    }

    return count;
  }

  reset() {
    this.matrix.forEach((row) => row.fill(0));
  }
}

export default Grid;
