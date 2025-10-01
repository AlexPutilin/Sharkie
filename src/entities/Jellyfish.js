class Jellyfish extends Entity {
    lastAnimationTime = 0;
    animationInterval = 100;
    swimSprites = [
        'assets/sprites/enemy/jellyfish/swim/jellyfish_swim_1.png',
        'assets/sprites/enemy/jellyfish/swim/jellyfish_swim_2.png',
        'assets/sprites/enemy/jellyfish/swim/jellyfish_swim_3.png',
        'assets/sprites/enemy/jellyfish/swim/jellyfish_swim_4.png',
    ];
    hitSprites = [
        'assets/sprites/enemy/jellyfish/shock/jellyfish_shock_1.png',
        'assets/sprites/enemy/jellyfish/shock/jellyfish_shock_2.png',
        'assets/sprites/enemy/jellyfish/shock/jellyfish_shock_3.png',
        'assets/sprites/enemy/jellyfish/shock/jellyfish_shock_4.png',
    ];
    deathSprites = [
        'assets/sprites/enemy/jellyfish/dead/jellyfish_dead_1.png',
        'assets/sprites/enemy/jellyfish/dead/jellyfish_dead_2.png',
        'assets/sprites/enemy/jellyfish/dead/jellyfish_dead_3.png',
        'assets/sprites/enemy/jellyfish/dead/jellyfish_dead_4.png',
    ];
    
    /**
     * Creates a new enemy instance with randomized movement and animations.
     * @param {...any} args - Arguments passed to the parent class.
     */
    constructor(...args) {
        super(...args);
        this.collisionBox = {x: 5 , y: 5, w: 90, h: 90};
        this.speed = 1 + Math.random() * 1.2;
        this.movementRange = 150 + Math.random() * 150;
        this.direction = Math.random() < 0.5 ? 'up' : 'down';
        this.startY = this.posY;
        this.loadSpriteCache(this.swimSprites);
        this.loadSpriteCache(this.hitSprites);
        this.loadSpriteCache(this.deathSprites);
        this.animationLoop();
    }

    /**
     * Main animation loop handling movement and sprite updates.
     * @param {number} [timestamp=0] - Current time provided by requestAnimationFrame.
     */
    animationLoop(timestamp = 0) {
        this.handleMovement();
        if(timestamp - this.lastAnimationTime > this.animationInterval) {
            this.handleAnimation();
            this.lastAnimationTime = timestamp;
        }
        requestAnimationFrame((t) => this.animationLoop(t));
    }

    /**
     * Handles vertical movement based on current direction.
     */
    handleMovement() {
        if (this.direction === 'up') {
            this.moveUp();
        } else {
            this.moveDown();
        }
    }

    /**
     * Moves the enemy upwards until it reaches its upper range limit.
     */
    moveUp() {
        this.move("up");
        if (this.posY < this.startY - this.movementRange) {
            this.direction = 'down';
        }
    }

    /**
     * Moves the enemy downwards until it reaches its lower range limit.
     */
    moveDown() {
        this.move("down");
        if (this.posY > this.startY + this.movementRange) {
            this.direction = 'up';
        }
    }

    /**
     * Plays the correct animation depending on the enemy's state.
     * - Hit animation if colliding.
     * - Death animation if dead (and marks for destruction).
     * - Swim animation otherwise.
     */
    handleAnimation() {
        if (this.onColliding) this.playAnimation(this.hitSprites);
        else if (this.isDeath()) this.playAnimation(this.deathSprites, false, () => this.destroyClass = true);
        else this.playAnimation(this.swimSprites);
    }
}