class Pufferfish extends Actor {
    swimSprites = [
        '../assets/sprites/enemy/pufferfish/bubbleswim/pufferfish_bubble_swim_1.png',
        '../assets/sprites/enemy/pufferfish/bubbleswim/pufferfish_bubble_swim_2.png',
        '../assets/sprites/enemy/pufferfish/bubbleswim/pufferfish_bubble_swim_3.png',
        '../assets/sprites/enemy/pufferfish/bubbleswim/pufferfish_bubble_swim_4.png',
        '../assets/sprites/enemy/pufferfish/bubbleswim/pufferfish_bubble_swim_5.png',
    ]
    currentSpriteImg = 0;

    constructor() {
        super(900, 400);
        // this.loadImg('../assets/sprites/enemy/jellyfish/swim/jellyfish_swim_1.png');
        this.loadSpriteCache(this.swimSprites);
        this.animate();
        this.speed = 5 + Math.random() * 5;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            let path = this.swimSprites[this.currentSpriteImg];
            this.img = this.spriteCache[path];
            this.currentSpriteImg++;
            this.currentSpriteImg = (this.currentSpriteImg + this.swimSprites.length) % this.swimSprites.length;
        }, 100);
    }
}