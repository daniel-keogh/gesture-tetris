class Player {
    /** Creates a new Player object. */
    constructor(tetrimino) {
        this.tetrimino = tetrimino;
        this.position = { x: 0, y: 0 };
    }

    get matrix() {
        return this.tetrimino.matrix;
    }

    draw() {
        this.tetrimino.draw(this.position);
    }

    rotate(direction) {
        this.tetrimino.rotate(direction);
    }
}

export default Player;
