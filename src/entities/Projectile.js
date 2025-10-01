class Projectile extends Entity {
    poisoned = false;

    /**
     * Creates a new projectile instance fired by the player.
     * @param {number} x - The starting x-coordinate of the projectile.
     * @param {number} y - The starting y-coordinate of the projectile.
     * @param {boolean} reverse - Whether the projectile moves left instead of right.
     * @param {boolean} poison - Whether the projectile is poisoned.
     */
    constructor(x, y, reverse, poison) {
        super(x, y, 50, 50);
        this.reverse = reverse;
        this.collisionBox = {x: 0 , y: 0, w: 50, h: 50};
        this.setPoisonState(poison);
        this.pushProjectile();
    }

    /**
     * Sets the projectile's state (normal or poisoned) and loads the corresponding sprite.
     * @param {boolean} poison - True if the projectile should be poisoned.
     */
    setPoisonState(poison) {
        if (poison) {
            this.loadImg('assets/sprites/sharkie/attack/bubble_poisoned/Poisoned_Bubble.png');
            this.poisoned = true;
        } else {
            this.loadImg('assets/sprites/sharkie/attack/bubble/Bubble.png');
            this.poisoned = false;
        }
    }

    /**
     * Starts the projectile's movement across the screen.
     * Moves left if `reverse` is true, otherwise moves right.
     */
    pushProjectile() {
        this.speed = 10;
        setStoppableInterval(() => {
            if (this.reverse) {
                this.posX -= this.speed;
            } else {
                this.posX += this.speed;
            }
        }, 1000 / 60);
    }
}