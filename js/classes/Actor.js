class Actor {

    posX;
    posY;
    width;
    height;
    speed;
    spriteCache = {};
    currentSpriteImg = 0;
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

    move(direction) {
        switch (direction) {
            case "right":
                this.posX += this.speed;
                break;
            case "left":
                this.posX -= this.speed;
                break
            case "up":
                this.posY -= this.speed;
                break
            case "down":
                this.posY += this.speed;
                break
            default:
                break;
        }
    }

    playAnimation(sprites) {
        let path = sprites[this.currentSpriteImg];
        this.img = this.spriteCache[path];
        this.currentSpriteImg++;
        this.currentSpriteImg = (this.currentSpriteImg + sprites.length) % sprites.length;
    }

    takeDmg() {
        
    }
    
    die() {

    }
}