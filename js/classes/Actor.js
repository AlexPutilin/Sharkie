class Actor {
    posX;
    posY;
    width;
    height;
    collisionBox = {x: 0, y: 0, w: 0, h: 0};
    speed;
    life = 100;
    spriteCache = {};
    currentSpriteImg = 0;
    currentSprites;
    img = new Image();

    constructor(x=0, y=0, width=100, height=100) {
        this.posX = x
        this.posY = y
        this.width = width;
        this.height = height;
    }

    loadSpriteCache(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.spriteCache[path] = img;
        });
    }

    playAnimation(sprites) {
        if(this.currentSprites !== sprites) {
            this.currentSprites = sprites;
            this.currentSpriteImg = 0;
        }
        let path = sprites[this.currentSpriteImg];
        this.img = this.spriteCache[path];
        this.currentSpriteImg++;
        this.currentSpriteImg = (this.currentSpriteImg + sprites.length) % sprites.length;
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

    isColliding(obj) {
        return (this.posX + this.collisionBox.x) + this.collisionBox.w > (obj.posX + obj.collisionBox.x) && 
            (this.posY + this.collisionBox.y) + this.collisionBox.h > (obj.posY + obj.collisionBox.y) && 
            (this.posX + this.collisionBox.x) < (obj.posX + obj.collisionBox.x) && 
            (this.posY + this.collisionBox.y) < (obj.posY + this.collisionBox.y) + obj.collisionBox.h
    }

    takeDmg() {
        this.life = Math.max(0, this.life - 25);
        console.log("life: ", this.life);
    }
    
    isDeath() {
        return this.life === 0;
    }
}