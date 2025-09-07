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
    isColliding = false;

    constructor(...args) {
        super(...args);
        this.collisionBox = {x: 5 , y: 5, w: 90, h: 90};
        this.speed = 0.5 + Math.random() * 1;
        this.loadSpriteCache(this.swimSprites);
        this.loadSpriteCache(this.hitSprites);
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
        this.move("left");
    }

    handleAnimation() {
        if (this.isColliding) {
            this.playAnimation(this.hitSprites);
        } else {
            this.playAnimation(this.swimSprites);
        }
    }

    onCollision() {
        if (this.isColliding) return;
        this.isColliding = true;
        setTimeout(() => {
            this.isHit = false;
        }, 1000)
    }
}