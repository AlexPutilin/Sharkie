class GameObject {
    posX;
    posY;
    width;
    height;
    img = new Image();
    collisionBox = {x: 0, y: 0, w: 0, h: 0}

    constructor(x, y, w, h) {
        this.posX = x
        this.posY = y
        this.width = w;
        this.height = h;
    }

    loadImg(path) {
        this.img.src = path;
    }
}