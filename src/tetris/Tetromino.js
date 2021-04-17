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

export { TShape };
