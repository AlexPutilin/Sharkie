class GameObject {
    posX;
    posY;
    width;
    height;
    collisionBox = {x: 0, y: 0, w: 0, h: 0}
    img = new Image();

    loadImg(path) {
        this.img.src = path;
    }
}