class Pickable extends Entity {
    lastAnimationTime = 0;
    animationInterval = 150;
    animSprite = [];

    /**
     * Creates a new Pickable instance.
     * @param {number} x - The x-coordinate of the pickable object.
     * @param {number} y - The y-coordinate of the pickable object.
     * @param {HTMLImageElement[]|string[]} sprites - The array of sprites used for animation.
     */
    constructor(x, y, sprites) {
        super(x, y, 50, 50);
        this.collisionBox = {x: 0 , y: 0, w: 50, h: 50};
        this.animSprite = sprites;
        this.loadSpriteCache(this.animSprite);
        this.animationLoop();
    }

    /**
     * Continuously updates the sprite animation in a loop.
     * @param {number} [timestamp=0] - The current timestamp from requestAnimationFrame.
     * @private
     */
    animationLoop(timestamp = 0) {
        if(timestamp - this.lastAnimationTime > this.animationInterval) {
            this.playAnimation(this.animSprite);
            this.lastAnimationTime = timestamp;
        }
        requestAnimationFrame((t) => this.animationLoop(t));
    }
}