class Actor {

    posX;
    posY;
    width;
    height;
    life;

    constructor(x=0, y=0, width=100, height=100, life=100) {
        this.posX = x
        this.posY = y
        this.width = width;
        this.height = height;
        this.life = life
        // this.loadImg(path);
    }

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    move() {
        
    }

    takeDmg() {
        
    }
    
    die() {

    }
}