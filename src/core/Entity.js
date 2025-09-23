class Entity extends GameObject {
    speed;
    life = 100;
    spriteCache = {};
    currentSprites;
    currentSpriteIndex = 0;
    destroyClass = false;
    onColliding = false;
    isHit = false;

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

    playAnimation(sprites, loop = true, onEnd = null) {
        this.resetAnimationIndex(sprites);
        let path = sprites[this.currentSpriteIndex];
        this.img = this.spriteCache[path];
        if (loop) {
            this.currentSpriteIndex = (this.currentSpriteIndex + 1) % this.currentSprites.length;
        } else {
            if (this.currentSpriteIndex < this.currentSprites.length - 1) {
            this.currentSpriteIndex++;
            } else {
            if (onEnd) onEnd();
            }
        }
    }

    resetAnimationIndex(sprites) {
        if (this.currentSprites !== sprites) {
            this.currentSprites = sprites;
            this.currentSpriteIndex = 0;
        }
    }

    move(direction) {
        if (direction === "right") return this.posX += this.speed;
        if (direction === "left") return this.posX -= this.speed;
        if (direction === "up") return this.posY -= this.speed;
        if (direction === "down") return this.posY += this.speed;
    }

    isColliding(obj) {
        return (
            this.posX + this.collisionBox.x < obj.posX + obj.collisionBox.x + obj.collisionBox.w &&
            this.posX + this.collisionBox.x + this.collisionBox.w > obj.posX + obj.collisionBox.x &&
            this.posY + this.collisionBox.y < obj.posY + obj.collisionBox.y + obj.collisionBox.h &&
            this.posY + this.collisionBox.y + this.collisionBox.h > obj.posY + obj.collisionBox.y
        );
    }

    onCollision() {
        if (this.onColliding) return;
        this.onColliding = true;
        setTimeout(() => {
            this.onColliding = false;
        }, 1000);
    }

    getHit(dmg) {
        if (this.isHit) return;
        this.isHit = true;
        this.takeDmg(dmg);
        setTimeout(() => {
            this.isHit = false;
        }, 1000);
    }

    takeDmg(dmg) {        
        this.life = Math.max(0, this.life - dmg);
    }
    
    isDeath() {
        return this.life === 0;
    }
}