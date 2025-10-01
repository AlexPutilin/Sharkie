class Healthbar extends Statusbar {
    statusBarImgs = [
        'assets/imgs/bars/life/bar_life_100.png',
        'assets/imgs/bars/life/bar_life_80.png',
        'assets/imgs/bars/life/bar_life_60.png',
        'assets/imgs/bars/life/bar_life_40.png',
        'assets/imgs/bars/life/bar_life_20.png',
        'assets/imgs/bars/life/bar_life_0.png',
    ];

    /**
     * Creates a new Healthbar instance at a fixed position in the HUD.
     * Loads the initial image based on the current status index.
     */
    constructor() {
        super(20, 0, 220, 60);
        this.loadImg(this.statusBarImgs[this.statusBarIndex]);
    }
}

