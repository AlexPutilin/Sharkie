class PlayerCharacter extends Actor {

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
    currentSpriteImg = 0;

    constructor() {
        super(0, 200, 200, 200);
        // this.loadImg('../assets/sprites/sharkie/idle/sharkie_idle_1.png');
        this.loadSpriteCache(this.idleSprites);
        this.idleAnim();
    }

    idleAnim() {
        setInterval(() => {
            let path = this.idleSprites[this.currentSpriteImg];
            this.img = this.spriteCache[path];
            this.currentSpriteImg++;
            this.currentSpriteImg = (this.currentSpriteImg + this.idleSprites.length) % this.idleSprites.length;
        }, 100);
    }

    attackBubbleBeam() {
        
    }

    attackFinSlash() {

    }
}