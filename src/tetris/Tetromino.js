import Matrix from './Matrix';

/**
 * Base class for all the other tetris shapes.
 */
class Tetromino extends Matrix {
    /**
     * Rotates this object.
     * Reference: https://www.youtube.com/watch?v=H2aW5V46khA
     * @param {Number} direction Determines the direction to rotate in.
     */
    rotate(direction) {
        // Convert each row to a column
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

class OShape extends Tetromino {
    /**
     * Creates a O-shaped Tetromino.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
    constructor(ctx) {
        super(ctx, [
            [2, 2],
            [2, 2],
        ]);
    }
}

class LShape extends Tetromino {
    /**
     * Creates a L-shaped Tetromino.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
    constructor(ctx) {
        super(ctx, [
            [0, 3, 0],
            [0, 3, 3],
            [0, 3, 0],
        ]);
    }
}

class JShape extends Tetromino {
    /**
     * Creates a J-shaped Tetromino.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
    constructor(ctx) {
        super(ctx, [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ]);
    }
}

class IShape extends Tetromino {
    /**
     * Creates a I-shaped Tetromino.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
    constructor(ctx) {
        super(ctx, [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ]);
    }
}

class SShape extends Tetromino {
    /**
     * Creates a S-shaped Tetromino.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
    constructor(ctx) {
        super(ctx, [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ]);
    }
}

class ZShape extends Tetromino {
    /**
     * Creates a Z-shaped Tetromino.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
    constructor(ctx) {
        super(ctx, [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ]);
    }
}

/**
 * Creates an instance of a random Tetromino object.
 * @param {CanvasRenderingContext2D} ctx The canvas context.
 * @returns {Tetromino} A random Tetromino object.
 */
function createRandomTetromino(ctx) {
    const pieces = [IShape, JShape, LShape, OShape, SShape, TShape, ZShape];
    const T = pieces[Math.floor(Math.random() * pieces.length)];
    return new T(ctx);
}

export {
    Tetromino,
    IShape,
    JShape,
    LShape,
    OShape,
    SShape,
    TShape,
    ZShape,
    createRandomTetromino,
};
