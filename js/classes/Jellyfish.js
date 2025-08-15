class Jellyfish extends Actor {
    swimSprites = [
        '../assets/sprites/enemy/jellyfish/swim/jellyfish_swim_1.png',
        '../assets/sprites/enemy/jellyfish/swim/jellyfish_swim_2.png',
        '../assets/sprites/enemy/jellyfish/swim/jellyfish_swim_3.png',
        '../assets/sprites/enemy/jellyfish/swim/jellyfish_swim_4.png',
    ]
    currentSpriteImg = 0;

    constructor() {
        super(800, 200);
        // this.loadImg('../assets/sprites/enemy/jellyfish/swim/jellyfish_swim_1.png');
        this.loadSpriteCache(this.swimSprites);
        this.move();
    }

    move() {
        setInterval(() => {
            this.posX -= 5;
            let path = this.swimSprites[this.currentSpriteImg];
            this.img = this.spriteCache[path];
            this.currentSpriteImg++;
            this.currentSpriteImg = (this.currentSpriteImg + this.swimSprites.length) % this.swimSprites.length;
        }, 100);
    }
}