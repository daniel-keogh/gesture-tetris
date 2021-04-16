class Colour {
    static #shapeColours = ['red', 'cyan', 'green', 'magenta'];
    static #backgroundColour = 'black';

    /**
     * Gets a random shape colour.
     * @returns A random shape colour.
     */
    static random() {
        return this.#shapeColours[
            Math.floor(Math.random() * this.#shapeColours.length)
        ];
    }

    /**
     * Gets the canvas background colour.
     */
    static get background() {
        return this.#backgroundColour;
    }
}

export { Colour };
