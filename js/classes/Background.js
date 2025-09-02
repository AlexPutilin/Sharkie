class Background {
    posX;
    posY = 0;
    width = 1080;
    height = 720;
    collisionBox = {x: 0, y: 0, w: 0, h: 0};
    img = new Image();

    constructor(imgPath, x) {
        this.loadImg(imgPath);
        this.posX = x;
    }

    loadImg(path) {
        this.img.src = path;
    }
}