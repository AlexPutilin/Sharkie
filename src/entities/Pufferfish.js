class Pufferfish extends Entity {
    lastAnimationTime = 0;
    animationInterval = 100;
    swimSprites = [
        'assets/sprites/enemy/pufferfish/swim/pufferfish_swim_1.png',
        'assets/sprites/enemy/pufferfish/swim/pufferfish_swim_2.png',
        'assets/sprites/enemy/pufferfish/swim/pufferfish_swim_3.png',
        'assets/sprites/enemy/pufferfish/swim/pufferfish_swim_4.png',
        'assets/sprites/enemy/pufferfish/swim/pufferfish_swim_5.png',
    ];
    hitSprites = [
        'assets/sprites/enemy/pufferfish/transition/pufferfish_transition_1.png',
        'assets/sprites/enemy/pufferfish/transition/pufferfish_transition_3.png',
        'assets/sprites/enemy/pufferfish/transition/pufferfish_transition_5.png',
        'assets/sprites/enemy/pufferfish/transition/pufferfish_transition_5.png',
        'assets/sprites/enemy/pufferfish/transition/pufferfish_transition_5.png',
        'assets/sprites/enemy/pufferfish/transition/pufferfish_transition_5.png',
        'assets/sprites/enemy/pufferfish/transition/pufferfish_transition_4.png',
        'assets/sprites/enemy/pufferfish/transition/pufferfish_transition_3.png',
        'assets/sprites/enemy/pufferfish/transition/pufferfish_transition_2.png',
        'assets/sprites/enemy/pufferfish/transition/pufferfish_transition_1.png',
    ];
    deathSprites = [
        'assets/sprites/enemy/pufferfish/dead/pufferfish_dead_1.png',
        'assets/sprites/enemy/pufferfish/dead/pufferfish_dead_2.png',
        'assets/sprites/enemy/pufferfish/dead/pufferfish_dead_3.png',
    ];
    flippedImg = false;

    /**
     * Creates a new horizontally moving enemy with randomized speed and movement range.
     * @param {...any} args - Arguments passed to the parent class.
     */
    constructor(...args) {
        super(...args);
        this.collisionBox = {x: 5 , y: 5, w: 85, h: 45};
        this.speed = 1 + Math.random() * 1.2;
        this.movementRange = 150 + Math.random() * 150;
        this.direction = 'left';
        this.startX = this.posX;
        this.loadSpriteCache(this.swimSprites);
        this.loadSpriteCache(this.hitSprites);
        this.loadSpriteCache(this.deathSprites);
        this.animationLoop();
    }

    /**
     * Main animation loop handling movement and sprite updates.
     * @param {number} [timestamp=0] - Current time from requestAnimationFrame.
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
     * Handles horizontal movement based on the current direction.
     */
    handleMovement() {
        if (this.direction === 'left') {
            this.moveLeft();
        } else {
            this.moveRight();
        }
    }

    /**
     * Moves the enemy to the left until it reaches the movement boundary,
     * then switches direction to right.
     */
    moveLeft() {
        this.move("left");
        this.flippedImg = false;
        if (this.posX < this.startX - this.movementRange) {
            this.direction = 'right';
        }
    }

    /**
     * Moves the enemy to the right until it reaches the movement boundary,
     * then switches direction to left.
     */
    moveRight() {
        this.move("right");
        this.flippedImg = true;
        if (this.posX > this.startX + this.movementRange) {
            this.direction = 'left';
        }
    }

    /**
     * Plays the correct animation depending on the enemy’s state:
     * - Hit animation when colliding,
     * - Death animation when dead (marks for destruction),
     * - Swim animation otherwise.
     */
    handleAnimation() {
        if (this.onColliding) this.playAnimation(this.hitSprites);
        else if (this.isDeath()) this.playAnimation(this.deathSprites, false, () => this.destroyClass = true);
        else this.playAnimation(this.swimSprites);
    }
}