class Poison extends Pickable {    
    constructor(x, y) {
        super(x, y, [
            'assets/sprites/poison/poison_1.png',
            'assets/sprites/poison/poison_2.png',
            'assets/sprites/poison/poison_3.png',
            'assets/sprites/poison/poison_4.png',
            'assets/sprites/poison/poison_5.png',
            'assets/sprites/poison/poison_6.png',
            'assets/sprites/poison/poison_7.png',
            'assets/sprites/poison/poison_8.png',
        ]);
        this.update();

    }

    update() {
        this.speed = 1;
        setStoppableInterval(() => {
            this.posY += this.speed;
        }, 1000 / 60);
    }
}