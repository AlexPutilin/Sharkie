class Poison extends Pickable {
    /**
     * Creates a new poison at the given position.
     * @param {number} x - The x-coordinate of the poison.
     * @param {number} y - The y-coordinate of the poison.
     */  
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
        this.pickUpAudio = new Audio('assets/audio/audio-collect-item.mp3');
        registerSound([this.pickUpAudio]);
        this.update();
    }

    /**
     * Starts the downward movement of the poison item.
     * Updates the vertical position at a constant speed using a stoppable interval.
     * @returns {void}
     */
    update() {
        this.speed = 1;
        setStoppableInterval(() => {
            this.posY += this.speed;
        }, 1000 / 60);
    }
}