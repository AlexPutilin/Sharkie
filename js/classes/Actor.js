class Actor {

    posX;
    posY;
    width;
    height;
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

    move() {
        
    }

    takeDmg() {
        
    }
    
    die() {

    }
}