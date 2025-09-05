class Statusbar extends GameObject {
    statusBarImgs = [];
    statusBarIndex = 0;

    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.loadImg(this.statusBarImgs[this.statusBarIndex]);
    }

    reduceStatusbar() {
        this.statusBarIndex = Math.min(this.statusBarImgs.length-1, this.statusBarIndex + 1);
        this.loadImg(this.statusBarImgs[this.statusBarIndex])
    }

    increaseStatusbar() {
        this.statusBarIndex = Math.max(0, this.statusBarIndex - 1);
        this.loadImg(this.statusBarImgs[this.statusBarIndex])
    }
}