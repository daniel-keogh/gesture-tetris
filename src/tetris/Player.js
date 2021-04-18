/**
 * Represents the player's current state.
 */
class Player {
  /**
   * Creates a new Player object, which has a reference to the currently
   * active tetrimino and it's co-ordinates.
   */
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
