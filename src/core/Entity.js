class Entity extends GameObject {
    speed;
    life = 100;
    spriteCache = {};
    currentSprites;
    currentSpriteIndex = 0;
    destroyClass = false;
    onColliding = false;
    isHit = false;
    isAudioPlaying = false;

    /**
     * Creates a new Entity instance.
     * @param {...any} args Arguments passed to the GameObject constructor.
     */
    constructor(...args) {
        super(...args);
    }

    /**
     * Loads sprite images into the cache from given paths.
     * @param {string[]} arr Array of image paths.
     */
    loadSpriteCache(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.spriteCache[path] = img;
        });
    }

    /**
     * Plays an animation sequence from the given sprites.
     * @param {string[]} sprites Array of sprite paths.
     * @param {boolean} [loop=true] Whether to loop the animation.
     * @param {Function|null} [onEnd=null] Callback when animation ends (if not looping).
     */
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

    /**
     * Resets the animation index if the sprite sequence has changed.
     * @param {string[]} sprites Array of sprite paths.
     */
    resetAnimationIndex(sprites) {
        if (this.currentSprites !== sprites) {
            this.currentSprites = sprites;
            this.currentSpriteIndex = 0;
        }
    }

    /**
     * Plays an audio effect if not already playing.
     * @param {HTMLAudioElement} audio Audio element to play.
     */
    playAudioFx(audio) {
        if (this.isAudioPlaying) return;
        this.isAudioPlaying = true;
        console.log("playing");
        audio.currentTime = 0;
        audio.play();
        setTimeout(() => {
            this.isAudioPlaying = false;
        }, 1000);
    }

    /**
     * Moves the entity in the specified direction.
     * @param {"right"|"left"|"up"|"down"} direction Direction to move.
     * @returns {number} New position value.
     */
    move(direction) {
        if (direction === "right") return this.posX += this.speed;
        if (direction === "left") return this.posX -= this.speed;
        if (direction === "up") return this.posY -= this.speed;
        if (direction === "down") return this.posY += this.speed;
    }

    /**
     * Checks if this entity is colliding with another object.
     * @param {Object} obj Object to check collision against.
     * @returns {boolean} True if colliding, false otherwise.
     */
    isColliding(obj) {
        return (
            this.posX + this.collisionBox.x < obj.posX + obj.collisionBox.x + obj.collisionBox.w &&
            this.posX + this.collisionBox.x + this.collisionBox.w > obj.posX + obj.collisionBox.x &&
            this.posY + this.collisionBox.y < obj.posY + obj.collisionBox.y + obj.collisionBox.h &&
            this.posY + this.collisionBox.y + this.collisionBox.h > obj.posY + obj.collisionBox.y
        );
    }

    /**
     * Handles collision state and cooldown.
     */
    onCollision() {
        if (this.onColliding) return;
        this.onColliding = true;
        setTimeout(() => {
            this.onColliding = false;
        }, 1000);
    }

    /**
     * Handles getting hit and damage cooldown.
     * @param {number} dmg Amount of damage to take.
     */
    getHit(dmg) {
        if (this.isHit) return;
        this.isHit = true;
        this.takeDmg(dmg);
        setTimeout(() => {
            this.isHit = false;
        }, 1000);
    }

    /**
     * Reduces entity life by damage amount.
     * @param {number} dmg Amount of damage.
     */
    takeDmg(dmg) {        
        this.life = Math.max(0, this.life - dmg);
    }
    
    /**
     * Checks if the entity's life has reached zero.
     * @returns {boolean} True if dead, false otherwise.
     */
    isDeath() {
        return this.life === 0;
    }
}