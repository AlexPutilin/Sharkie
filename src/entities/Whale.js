class Whale extends Entity {
    lastAnimationTime = 0;
    animationInterval = 100;
    swimSprites = [
        'assets/sprites/enemy/whale/swim/whale_swim_1.png',
        'assets/sprites/enemy/whale/swim/whale_swim_2.png',
        'assets/sprites/enemy/whale/swim/whale_swim_3.png',
        'assets/sprites/enemy/whale/swim/whale_swim_4.png',
        'assets/sprites/enemy/whale/swim/whale_swim_5.png',
        'assets/sprites/enemy/whale/swim/whale_swim_6.png',
        'assets/sprites/enemy/whale/swim/whale_swim_7.png',
        'assets/sprites/enemy/whale/swim/whale_swim_8.png',
        'assets/sprites/enemy/whale/swim/whale_swim_9.png',
        'assets/sprites/enemy/whale/swim/whale_swim_10.png',
        'assets/sprites/enemy/whale/swim/whale_swim_11.png',
        'assets/sprites/enemy/whale/swim/whale_swim_12.png',
        'assets/sprites/enemy/whale/swim/whale_swim_13.png',
    ];
    hitSprites = [
        'assets/sprites/enemy/whale/hurt/whale_hurt_1.png',
        'assets/sprites/enemy/whale/hurt/whale_hurt_2.png',
        'assets/sprites/enemy/whale/hurt/whale_hurt_3.png',
        'assets/sprites/enemy/whale/hurt/whale_hurt_4.png',
    ];
    deathSprites = [
        'assets/sprites/enemy/whale/dead/whale_dead_1.png',
        'assets/sprites/enemy/whale/dead/whale_dead_2.png',
        'assets/sprites/enemy/whale/dead/whale_dead_3.png',
        'assets/sprites/enemy/whale/dead/whale_dead_4.png',
        'assets/sprites/enemy/whale/dead/whale_dead_5.png',
    ];
    isColliding = false;

    constructor(...args) {
        super(...args);
        this.collisionBox = {x: 20 , y: 100, w: 260, h: 150};
        this.speed = 1;
        this.life = 300;
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
        // this.move("left");
    }

    handleAnimation() {
        if (this.isColliding) {
            this.playAnimation(this.hitSprites);
        } else if (this.isDeath()) {
            this.playAnimation(this.deathSprites, false, () => {
                this.destroyClass = true;
            });
        } else {
            this.playAnimation(this.swimSprites);
        }
    }

    onCollision() {
        if (this.isColliding) return;
        this.isColliding = true;
        setStoppableInterval(() => {
            this.isColliding = false;
        }, 1000);
    }
}