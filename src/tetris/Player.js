import Matrix from './Matrix';

class Player extends Matrix {
    /**
     * Creates a new Player object.
     * @param {{x: Number, y: Numner}} position The player's current position.
     * @param {Number[][]} matrix The game model.
     */
    constructor(ctx, matrix, position) {
        super(ctx, matrix);
        this.position = position;
    }
}

export default Player;
