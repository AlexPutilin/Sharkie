class Background extends GameObject {
    constructor(x, y, w, h, img) {
        super(x, y, w, h);
        this.loadImg(img);
    }
}