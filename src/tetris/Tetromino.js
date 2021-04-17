import Matrix from './Matrix';

class IShape extends Matrix {
    /**
     * Creates a I-shaped Tetromino.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
    constructor(ctx) {
        super(ctx, '#00F0F0', [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ]);
    }
}

class JShape extends Matrix {
    /**
     * Creates a J-shaped Tetromino.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
    constructor(ctx) {
        super(ctx, '#F0A000', [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
        ]);
    }
}

class LShape extends Matrix {
    /**
     * Creates a L-shaped Tetromino.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
    constructor(ctx) {
        super(ctx, '#0000F0', [
            [0, 1, 0],
            [0, 1, 1],
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
        super(ctx, '#F0F000', [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
    }
}

class SShape extends Matrix {
    /**
     * Creates a S-shaped Tetromino.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
    constructor(ctx) {
        super(ctx, '#00F000', [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ]);
    }
}

class TShape extends Matrix {
    /**
     * Creates a T-shaped Tetromino.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
    constructor(ctx) {
        super(ctx, '#A000F0', [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ]);
    }
}

class ZShape extends Matrix {
    /**
     * Creates a Z-shaped Tetromino.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
    constructor(ctx) {
        super(ctx, '#F00000', [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ]);
    }
}

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
