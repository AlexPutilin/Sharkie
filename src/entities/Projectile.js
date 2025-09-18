class Projectile extends Entity {
    constructor(x, y, reverse, poison) {
        super(x, y, 50, 50);
        this.reverse = reverse;
        this.collisionBox = {x: 0 , y: 0, w: 50, h: 50};
        poison ? this.loadImg('assets/sprites/sharkie/attack/bubble_poisoned/Poisoned_Bubble.png') : this.loadImg('assets/sprites/sharkie/attack/bubble/Bubble.png');
        this.pushProjectile();
    }

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