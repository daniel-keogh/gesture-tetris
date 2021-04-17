import Matrix from './Matrix';

class Grid extends Matrix {
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} width
     * @param {Number} height
     * @param {Player} player
     */
    constructor(ctx, width, height, player) {
        super(ctx, 'black', []);
        this.player = player;

        while (height--) {
            this.matrix.push(new Array(width).fill(0));
        }
    }

    /**
     * Detects a collision.
     * @returns `true` if the player has collided with something & `falase` otherwise.
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
}

export default Grid;
