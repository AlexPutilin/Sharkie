class Sharkie extends Entity {
    world;
    lastAnimationTime = 0;
    animationInterval = 100;
    idleSprites = [
        'assets/sprites/sharkie/idle/sharkie_idle_1.png',
        'assets/sprites/sharkie/idle/sharkie_idle_2.png',
        'assets/sprites/sharkie/idle/sharkie_idle_3.png',
        'assets/sprites/sharkie/idle/sharkie_idle_4.png',
        'assets/sprites/sharkie/idle/sharkie_idle_5.png',
        'assets/sprites/sharkie/idle/sharkie_idle_6.png',
        'assets/sprites/sharkie/idle/sharkie_idle_7.png',
        'assets/sprites/sharkie/idle/sharkie_idle_8.png',
        'assets/sprites/sharkie/idle/sharkie_idle_9.png',
        'assets/sprites/sharkie/idle/sharkie_idle_10.png',
        'assets/sprites/sharkie/idle/sharkie_idle_11.png',
        'assets/sprites/sharkie/idle/sharkie_idle_12.png',
        'assets/sprites/sharkie/idle/sharkie_idle_13.png',
        'assets/sprites/sharkie/idle/sharkie_idle_14.png',
        'assets/sprites/sharkie/idle/sharkie_idle_15.png',
        'assets/sprites/sharkie/idle/sharkie_idle_16.png',
        'assets/sprites/sharkie/idle/sharkie_idle_17.png',
        'assets/sprites/sharkie/idle/sharkie_idle_18.png',
    ];
    swimSprites = [
        'assets/sprites/sharkie/swim/sharkie_swim_1.png',
        'assets/sprites/sharkie/swim/sharkie_swim_2.png',
        'assets/sprites/sharkie/swim/sharkie_swim_3.png',
        'assets/sprites/sharkie/swim/sharkie_swim_4.png',
        'assets/sprites/sharkie/swim/sharkie_swim_5.png',
        'assets/sprites/sharkie/swim/sharkie_swim_6.png',
    ];
    attackSprites = [
        'assets/sprites/sharkie/attack/bubble/sharkie_attack_bubble_1.png',
        'assets/sprites/sharkie/attack/bubble/sharkie_attack_bubble_2.png',
        'assets/sprites/sharkie/attack/bubble/sharkie_attack_bubble_3.png',
        'assets/sprites/sharkie/attack/bubble/sharkie_attack_bubble_4.png',
        'assets/sprites/sharkie/attack/bubble/sharkie_attack_bubble_5.png',
        'assets/sprites/sharkie/attack/bubble/sharkie_attack_bubble_6.png',
        'assets/sprites/sharkie/attack/bubble/sharkie_attack_bubble_7.png',
        'assets/sprites/sharkie/attack/bubble/sharkie_attack_bubble_8.png',
    ];
    attackPoisonedSprites = [
        'assets/sprites/sharkie/attack/bubble_poisoned/sharkie_attack_bubble_poison_1.png',
        'assets/sprites/sharkie/attack/bubble_poisoned/sharkie_attack_bubble_poison_2.png',
        'assets/sprites/sharkie/attack/bubble_poisoned/sharkie_attack_bubble_poison_3.png',
        'assets/sprites/sharkie/attack/bubble_poisoned/sharkie_attack_bubble_poison_4.png',
        'assets/sprites/sharkie/attack/bubble_poisoned/sharkie_attack_bubble_poison_5.png',
        'assets/sprites/sharkie/attack/bubble_poisoned/sharkie_attack_bubble_poison_6.png',
        'assets/sprites/sharkie/attack/bubble_poisoned/sharkie_attack_bubble_poison_7.png',
        'assets/sprites/sharkie/attack/bubble_poisoned/sharkie_attack_bubble_poison_8.png',
    ];
    hurtShockedSprites = [
        'assets/sprites/sharkie/hurt/shocked/sharkie_hurt_shocked_1.png',
        'assets/sprites/sharkie/hurt/shocked/sharkie_hurt_shocked_2.png',
        'assets/sprites/sharkie/hurt/shocked/sharkie_hurt_shocked_3.png',
    ];
    deadShockedSprites = [
        'assets/sprites/sharkie/dead/shocked/sharkie_dead_shocked_1.png',
        'assets/sprites/sharkie/dead/shocked/sharkie_dead_shocked_2.png',
        'assets/sprites/sharkie/dead/shocked/sharkie_dead_shocked_3.png',
        'assets/sprites/sharkie/dead/shocked/sharkie_dead_shocked_4.png',
        'assets/sprites/sharkie/dead/shocked/sharkie_dead_shocked_5.png',
        'assets/sprites/sharkie/dead/shocked/sharkie_dead_shocked_6.png',
        'assets/sprites/sharkie/dead/shocked/sharkie_dead_shocked_7.png',
        'assets/sprites/sharkie/dead/shocked/sharkie_dead_shocked_8.png',
        'assets/sprites/sharkie/dead/shocked/sharkie_dead_shocked_9.png',
        'assets/sprites/sharkie/dead/shocked/sharkie_dead_shocked_10.png',
    ];
    flippedImg = false;
    isAttacking = false;
    isHit = false;
    isProjectileSpawned = false;

    constructor(world) {
        super(0, 200, 200, 200);
        this.world = world
        this.speed = 2;
        this.collisionBox = {x: 40 , y: 100, w: 120, h: 60};
        this.loadSpriteCache(this.idleSprites);
        this.loadSpriteCache(this.swimSprites);
        this.loadSpriteCache(this.attackSprites);
        this.loadSpriteCache(this.attackPoisonedSprites);
        this.loadSpriteCache(this.hurtShockedSprites);
        this.loadSpriteCache(this.deadShockedSprites);
        this.animationLoop();
    }

    animationLoop(timestamp = 0) {
        this.handleInputs();
        if(timestamp - this.lastAnimationTime > this.animationInterval) {
            this.handleAnimation();
            this.lastAnimationTime = timestamp;
        }
        requestAnimationFrame((t) => this.animationLoop(t));
    }

    handleInputs() {
        if (this.world.controller.kSpacePressedOnce && !this.isAttacking) {
            this.world.controller.kSpacePressedOnce = false;
            this.isAttacking = true;
        }
        if (this.world.controller.kRight && this.posX < 3340) {
            this.flippedImg = false;
            this.move("right");
        }
        if (this.world.controller.kLeft && this.posX > -980) {
            this.flippedImg = true;
            this.move("left");
        }
        if (this.world.controller.kUp && this.posY > -100) {
            this.move("up");
        }
        if (this.world.controller.kDown && this.posY < 570) {
            this.move("down");
        }
        this.world.cameraX = -this.posX + 100;
    }

    handleAnimation() {
        if (this.isHit) {
            this.playAnimation(this.hurtShockedSprites);
        } else if (this.isAttacking) {
            this.playAnimation(this.attackSprites, false, () => {
                this.isAttacking = false;
                this.spawnProjectile();
            });
        }
        else if (this.isDeath()) {
            this.playAnimation(this.deadShockedSprites, false);
        }
        else if (this.world.controller.kRight || this.world.controller.kLeft) {
            this.playAnimation(this.swimSprites);
        }
        else if (this.world.controller.kUp || this.world.controller.kDown) {
            this.playAnimation(this.swimSprites);
        } else {
            this.playAnimation(this.idleSprites);
        }
    }

    getHit() {
        if (this.isHit) return;
        this.isHit = true;
        this.takeDmg(20);
        this.world.healthbar.reduceStatusbar();
        setTimeout(() => {
            this.isHit = false;
        }, 1000)
    }

    spawnProjectile() {
        if (!this.isProjectileSpawned) {
            this.isProjectileSpawned = true;
            let offsetX = this.flippedImg ? 0 : 150 ;
            let projectile = new Projectile(this.posX + offsetX, this.posY + 100, this.flippedImg);
            this.world.projectiles.push(projectile);
            setTimeout(() => {
                this.isProjectileSpawned = false;
            }, 500);
        }
    }
}