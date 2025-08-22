class PlayerCharacter extends Actor {

    world;
    idleSprites = [
        '../assets/sprites/sharkie/idle/sharkie_idle_1.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_2.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_3.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_4.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_5.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_6.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_7.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_8.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_9.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_10.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_11.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_12.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_13.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_14.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_15.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_16.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_17.png',
        '../assets/sprites/sharkie/idle/sharkie_idle_18.png',
    ];
    swimSprites = [
        '../assets/sprites/sharkie/swim/sharkie_swim_1.png',
        '../assets/sprites/sharkie/swim/sharkie_swim_2.png',
        '../assets/sprites/sharkie/swim/sharkie_swim_3.png',
        '../assets/sprites/sharkie/swim/sharkie_swim_4.png',
        '../assets/sprites/sharkie/swim/sharkie_swim_5.png',
        '../assets/sprites/sharkie/swim/sharkie_swim_6.png',
    ];
    currentSpriteImg = 0;
    flippedImg = false;

    constructor() {
        super(0, 200, 200, 200);
        // this.loadImg('../assets/sprites/sharkie/idle/sharkie_idle_1.png');
        this.speed = 5;
        this.loadSpriteCache(this.swimSprites);
        // this.idleAnim();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.world.controller.kRight) {
                this.moveRight();
                this.flippedImg = false;
            }
            if(this.world.controller.kLeft) {
                this.moveLeft();
                this.flippedImg = true;
            }
            if(this.world.controller.kUp) {
                this.moveUp();
            }
            if(this.world.controller.kDown) {
                this.moveDown();
            }
            this.world.cameraX = -this.posX;
        }, 1000 / 60); 

        setInterval(() => {
            if(this.world.controller.kRight || this.world.controller.kLeft) {
                let path = this.swimSprites[this.currentSpriteImg];
                this.img = this.spriteCache[path];
                this.currentSpriteImg++;
                this.currentSpriteImg = (this.currentSpriteImg + this.swimSprites.length) % this.swimSprites.length;
            }
            if(this.world.controller.kUp || this.world.controller.kDown) {
                let path = this.swimSprites[this.currentSpriteImg];
                this.img = this.spriteCache[path];
                this.currentSpriteImg++;
                this.currentSpriteImg = (this.currentSpriteImg + this.swimSprites.length) % this.swimSprites.length;
            }
        }, 100);
    }



    idleAnim() {
        setInterval(() => {
            let path = this.idleSprites[this.currentSpriteImg];
            this.img = this.spriteCache[path];
            this.currentSpriteImg++;
            this.currentSpriteImg = (this.currentSpriteImg + this.idleSprites.length) % this.idleSprites.length;
        }, 100);
    }

    swimAnim() {

    }

    attackBubbleBeam() {
        
    }

    attackFinSlash() {

    }
}