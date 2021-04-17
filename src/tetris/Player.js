import Matrix from './Matrix';

class Player extends Matrix {
    /**
     * Creates a new Player object.
     * @param {{x: Number, y: Numner}} position The player's current position.
     * @param {Number[][]} matrix The game model.
     */
    constructor(ctx, matrix) {
        super(ctx, 'red', matrix);
        this.position = { x: 0, y: 0 };
    }

    draw() {
        super.draw(this.position);
    }
}

export default Player;
