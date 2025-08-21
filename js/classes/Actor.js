class Actor {

    posX;
    posY;
    width;
    height;
    speed;
    spriteCache = {};
    img = new Image();

    constructor(x=0, y=0, width=100, height=100) {
        this.posX = x
        this.posY = y
        this.width = width;
        this.height = height;
    }

    loadImg(path) {
        this.img.src = path;
    }

    loadSpriteCache(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.spriteCache[path] = img;
        });
    }

    moveLeft() {
        this.posX -= this.speed;
    }

    moveRight() {
        this.posX += this.speed;
    }

    moveUp() {
        this.posY -= this.speed;
    }

    moveDown() {
        this.posY += this.speed;
    }

    animate() {
        
    }

    takeDmg() {
        
    }
    
    die() {

    }
}