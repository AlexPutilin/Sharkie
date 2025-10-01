class Coinbar extends Statusbar {
    statusBarImgs = [
        'assets/imgs/bars/coin/bar_coin_0.png',
        'assets/imgs/bars/coin/bar_coin_20.png',
        'assets/imgs/bars/coin/bar_coin_40.png',
        'assets/imgs/bars/coin/bar_coin_60.png',
        'assets/imgs/bars/coin/bar_coin_80.png',
        'assets/imgs/bars/coin/bar_coin_100.png'
    ];

    /**
     * Creates a new Coinbar instance at a fixed position in the HUD.
     * Loads the initial image based on the current status index.
     */
    constructor() {
        super(20, 100, 220, 60);
        this.loadImg(this.statusBarImgs[this.statusBarIndex]);
    }
}