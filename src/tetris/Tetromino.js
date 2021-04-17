import Matrix from './Matrix';

class TShape extends Matrix {
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

class OShape extends Matrix {
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

class LShape extends Matrix {
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

class JShape extends Matrix {
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

class IShape extends Matrix {
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

class SShape extends Matrix {
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

class ZShape extends Matrix {
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
 * Factory function that creates an instance of a random tetromino object.
 * @param {CanvasRenderingContext2D} ctx The canvas context.
 * @returns A random tetromino object.
 */
function createRandomTetromino(ctx) {
    const pieces = [IShape, JShape, LShape, OShape, SShape, TShape, ZShape];
    const Tetromino = pieces[Math.floor(Math.random() * pieces.length)];
    return new Tetromino(ctx);
}

export {
    IShape,
    JShape,
    LShape,
    OShape,
    SShape,
    TShape,
    ZShape,
    createRandomTetromino,
};
