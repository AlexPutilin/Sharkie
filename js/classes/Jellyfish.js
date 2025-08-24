class Jellyfish extends Actor {
    swimSprites = [
        '../assets/sprites/enemy/jellyfish/swim/jellyfish_swim_1.png',
        '../assets/sprites/enemy/jellyfish/swim/jellyfish_swim_2.png',
        '../assets/sprites/enemy/jellyfish/swim/jellyfish_swim_3.png',
        '../assets/sprites/enemy/jellyfish/swim/jellyfish_swim_4.png',
    ]
    currentSpriteImg = 0;

    constructor(x, y) {
        super(x, y);
        // this.loadImg('../assets/sprites/enemy/jellyfish/swim/jellyfish_swim_1.png');
        this.loadSpriteCache(this.swimSprites);
        this.animate();
        this.speed = 1.5 + Math.random() * 1.5;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            let path = this.swimSprites[this.currentSpriteImg];
            this.img = this.spriteCache[path];
            this.currentSpriteImg++;
            this.currentSpriteImg = (this.currentSpriteImg + this.swimSprites.length) % this.swimSprites.length;
        }, 100);
    }
}