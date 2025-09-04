class Entity extends GameObject {

    speed;
    life = 100;
    spriteCache = {};
    currentSprites;
    currentSpriteIndex = 0;


    constructor(...args) {
        super(...args);
    }

    loadSpriteCache(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.spriteCache[path] = img;
        });
    }

    playAnimation(sprites) {
        this.currentSpriteIndex = (this.currentSpriteIndex + sprites.length) % sprites.length;
        let path = sprites[this.currentSpriteIndex];
        this.img = this.spriteCache[path];
        this.currentSpriteIndex++;
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

    takeDmg(dmg) {        
        this.life = Math.max(0, this.life - dmg);
    }
    
    isDeath() {
        return this.life === 0;
    }
}