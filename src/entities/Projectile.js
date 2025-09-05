class Projectile extends Entity {
    constructor(x, y) {
        super(x, y, 50, 50);
        this.loadImg('assets/sprites/sharkie/attack/bubble/Bubble.png');
        this.pushProjectile();
    }

    pushProjectile(x, y) {
        this.speed = 10;
        setInterval(() => {
            this.posX += this.speed;
        }, 1000 / 60);
    }
}