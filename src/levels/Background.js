class Background extends GameObject {
    constructor(x, y, w, h, img) {
        super();
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;
        this.loadImg(img);
    }
}