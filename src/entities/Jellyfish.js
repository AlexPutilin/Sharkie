class Jellyfish extends Entity {
    swimSprites = [
        'assets/sprites/enemy/jellyfish/swim/jellyfish_swim_1.png',
        'assets/sprites/enemy/jellyfish/swim/jellyfish_swim_2.png',
        'assets/sprites/enemy/jellyfish/swim/jellyfish_swim_3.png',
        'assets/sprites/enemy/jellyfish/swim/jellyfish_swim_4.png',
    ]

    constructor(x, y) {
        super(x, y);
        this.collisionBox = {x: 0 , y: 0, w: 100, h: 100};
        this.loadSpriteCache(this.swimSprites);
        this.animate();
        this.speed = 1.5 + Math.random() * 1.5;
    }

    animate() {
        setInterval(() => {
            this.move("left");
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.swimSprites);
        }, 100);
    }
}