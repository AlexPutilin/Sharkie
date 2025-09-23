class Projectile extends Entity {
    poisoned = false;

    constructor(x, y, reverse, poison) {
        super(x, y, 50, 50);
        this.reverse = reverse;
        this.collisionBox = {x: 0 , y: 0, w: 50, h: 50};
        this.setPoisonState(poison);
        this.pushProjectile();
    }

    setPoisonState(poison) {
        if (poison) {
            this.loadImg('assets/sprites/sharkie/attack/bubble_poisoned/Poisoned_Bubble.png');
            this.poisoned = true;
        } else {
            this.loadImg('assets/sprites/sharkie/attack/bubble/Bubble.png');
            this.poisoned = false;
        }
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