class Pickable extends Entity {
    lastAnimationTime = 0;
    animationInterval = 150;
    animSprite = [];

    constructor(x, y, sprites) {
        super(x, y, 50, 50);
        this.collisionBox = {x: 0 , y: 0, w: 50, h: 50};
        this.animSprite = sprites;
        this.loadSpriteCache(this.animSprite);
        this.animationLoop();
    }

    animationLoop(timestamp = 0) {
        if(timestamp - this.lastAnimationTime > this.animationInterval) {
            this.playAnimation(this.animSprite);
            this.lastAnimationTime = timestamp;
        }
        requestAnimationFrame((t) => this.animationLoop(t));
    }
}