class Coin extends Pickable {
    /**
     * Creates a new coin at the given position.
     * @param {number} x - The x-coordinate of the coin.
     * @param {number} y - The y-coordinate of the coin.
     */
    constructor(x, y) {
        super(x, y, [
            'assets/sprites/coin/coin_1.png',
            'assets/sprites/coin/coin_2.png',
            'assets/sprites/coin/coin_3.png',
            'assets/sprites/coin/coin_4.png',
        ]);
        this.pickUpAudio = new Audio('assets/audio/audio-collect-coin.mp3');
        registerSound([this.pickUpAudio]);
    }
}