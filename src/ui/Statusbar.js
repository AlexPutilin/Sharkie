class Statusbar extends GameObject {
    statusBarImgs = [];
    statusBarIndex = 0;

    /**
     * Creates a new Statusbar instance.
     * @param {number} x - The x-coordinate of the status bar.
     * @param {number} y - The y-coordinate of the status bar.
     * @param {number} w - The width of the status bar.
     * @param {number} h - The height of the status bar.
     */
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.loadImg(this.statusBarImgs[this.statusBarIndex]);
    }

    /**
     * Decreases the bar's value by increasing its index,
     * but ensures it does not exceed the last image.
     * @returns {void}
     */
    reduceStatusbar() {
        this.statusBarIndex = Math.min(this.statusBarImgs.length-1, this.statusBarIndex + 1);
        this.loadImg(this.statusBarImgs[this.statusBarIndex])
    }

    /**
     * Increases the bar's value by decreasing its index,
     * but ensures it does not go below the first image.
     * @returns {void}
     */
    increaseStatusbar() {
        this.statusBarIndex = Math.max(0, this.statusBarIndex - 1);
        this.loadImg(this.statusBarImgs[this.statusBarIndex])
    }
}