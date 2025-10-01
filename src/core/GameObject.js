class GameObject {
    posX;
    posY;
    width;
    height;
    img = new Image();
    collisionBox = {x: 0, y: 0, w: 0, h: 0}

    /**
     * Creates a new game object with given position and size.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     * @param {number} w - The width of the object.
     * @param {number} h - The height of the object.
     */
    constructor(x, y, w, h) {
        this.posX = x
        this.posY = y
        this.width = w;
        this.height = h;
    }

    /**
     * Loads an image from the given file path and assigns it to the object.
     * @param {string} path - The path to the image file.
     */
    loadImg(path) {
        this.img.src = path;
    }
}