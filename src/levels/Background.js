class Background extends GameObject {

    /**
     * Creates a new background instance.
     * @param {number} x - The x-coordinate of the background.
     * @param {number} y - The y-coordinate of the background.
     * @param {number} w - The width of the background.
     * @param {number} h - The height of the background.
     * @param {string} img - The path to the background image.
     */
    constructor(x, y, w, h, img) {
        super(x, y, w, h);
        this.loadImg(img);
    }
}