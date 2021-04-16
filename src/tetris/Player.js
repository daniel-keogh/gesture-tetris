class Player {
    /**
     * Creates a new Player object.
     * @param {{x: Number, y: Numner}} position The player's current position.
     * @param {Number[][]} matrix The game model.
     */
    constructor(position, matrix) {
        this.position = position;
        this.matrix = matrix;
    }
}

export default Player;
