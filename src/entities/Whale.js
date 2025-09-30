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
    attackSprites = [
       'assets/sprites/enemy/whale/attack/whale_attack_1.png',
       'assets/sprites/enemy/whale/attack/whale_attack_2.png',
       'assets/sprites/enemy/whale/attack/whale_attack_3.png',
       'assets/sprites/enemy/whale/attack/whale_attack_4.png',
       'assets/sprites/enemy/whale/attack/whale_attack_5.png',
       'assets/sprites/enemy/whale/attack/whale_attack_6.png',
    ];
    introSprites = [
        'assets/sprites/enemy/whale/intro/whale_intro_1.png',
        'assets/sprites/enemy/whale/intro/whale_intro_2.png',
        'assets/sprites/enemy/whale/intro/whale_intro_3.png',
        'assets/sprites/enemy/whale/intro/whale_intro_4.png',
        'assets/sprites/enemy/whale/intro/whale_intro_5.png',
        'assets/sprites/enemy/whale/intro/whale_intro_6.png',
        'assets/sprites/enemy/whale/intro/whale_intro_7.png',
        'assets/sprites/enemy/whale/intro/whale_intro_8.png',
        'assets/sprites/enemy/whale/intro/whale_intro_9.png',
        'assets/sprites/enemy/whale/intro/whale_intro_10.png',
    ]
    flippedImg = false;
    isIntroDone = false;
    isActive = false;
    bossAreaStart = 3200;
    bossAreaEnd = 4500;
    world;

    constructor(world) {
        super(4000, 0, 300, 300);
        this.world = world;
        this.speed = 0.5;
        this.life = 300;
        this.collisionBox = {x: -20 , y: 100, w: 300, h: 150};
        this.loadSpriteCache(this.introSprites);
        this.loadSpriteCache(this.swimSprites);
        this.loadSpriteCache(this.hitSprites);
        this.loadSpriteCache(this.deathSprites);
        this.loadSpriteCache(this.attackSprites);
        this.animationLoop();
    }

    animationLoop(timestamp = 0) {
        this.checkBossArea();
        if (this.isActive) {
            this.handleMovement();
            if(timestamp - this.lastAnimationTime > this.animationInterval) {
                this.handleAnimation();
                this.lastAnimationTime = timestamp;
            }
        }
        requestAnimationFrame((t) => this.animationLoop(t));
    }
    
    handleMovement() {
        const player = this.world.player;
        if (player.posX > this.posX) {
            this.move("right");
            this.flippedImg = true;
        }
        else if (player.posX < this.posX) {
            this.move("left");
            this.flippedImg = false;
        }
        if (player.posY > this.posY) this.move("down");
        else if (player.posY < this.posY) this.move("up");
    }

    handleAnimation() {
        if (!this.isIntroDone && this.isActive) this.playAnimation(this.introSprites, false, () => this.isIntroDone = true);
        else if (this.onColliding) this.playAnimation(this.attackSprites);
        else if (this.isHit) this.playAnimation(this.hitSprites);
        else if (this.isDeath()) this.playAnimation(this.deathSprites, false, () => this.destroyClass = true);
        else this.playAnimation(this.swimSprites);
    }

    getHit(dmg, poisoned) {
        if (poisoned) super.getHit(dmg);
    }

    checkBossArea() {
        const player = this.world.player;
        if (player.posX >= this.bossAreaStart && player.posX <= this.bossAreaEnd) {
            this.isActive = true;
        }
    }
}