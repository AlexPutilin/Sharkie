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

    animationLoop(timestamp = 0) {
        this.handleMovement();
        if(timestamp - this.lastAnimationTime > this.animationInterval) {
            this.handleAnimation();
            this.lastAnimationTime = timestamp;
        }
        requestAnimationFrame((t) => this.animationLoop(t));
    }

    handleMovement() {
        if (this.direction === 'left') {
            this.moveLeft();
        } else {
            this.moveRight();
        }
    }

    moveLeft() {
        this.move("left");
        this.flippedImg = false;
        if (this.posX < this.startX - this.movementRange) {
            this.direction = 'right';
        }
    }

    moveRight() {
        this.move("right");
        this.flippedImg = true;
        if (this.posX > this.startX + this.movementRange) {
            this.direction = 'left';
        }
    }

    handleAnimation() {
        if (this.onColliding) this.playAnimation(this.hitSprites);
        else if (this.isDeath()) this.playAnimation(this.deathSprites, false, () => this.destroyClass = true);
        else this.playAnimation(this.swimSprites);
    }
}