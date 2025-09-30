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
    verticalDirection = "up";
    
    constructor(...args) {
        super(...args);
        this.collisionBox = {x: 5 , y: 5, w: 90, h: 90};
        this.speed = 1 + Math.random() * 1.2;
        this.verticalRange = 150 + Math.random() * 150;
        this.verticalDirection = Math.random() < 0.5 ? 'up' : 'down';
        this.startY = this.posY;
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
        if (this.verticalDirection === 'up') {
            this.move("up");
            if (this.posY < this.startY - this.verticalRange) {
                this.verticalDirection = 'down';
            }
        } else {
            this.move("down");
            if (this.posY > this.startY + this.verticalRange) {
                this.verticalDirection = 'up';
            }
        }
    }

    handleAnimation() {
        if (this.onColliding) this.playAnimation(this.hitSprites);
        else if (this.isDeath()) this.playAnimation(this.deathSprites, false, () => this.destroyClass = true);
        else this.playAnimation(this.swimSprites);
    }
}