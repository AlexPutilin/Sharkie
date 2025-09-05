class Poisonbar extends Statusbar {
    statusBarImgs = [
        'assets/imgs/bars/poison/bar_poison_0.png',
        'assets/imgs/bars/poison/bar_poison_20.png',
        'assets/imgs/bars/poison/bar_poison_40.png',
        'assets/imgs/bars/poison/bar_poison_60.png',
        'assets/imgs/bars/poison/bar_poison_80.png',
        'assets/imgs/bars/poison/bar_poison_100.png',
    ];

    constructor() {
        super(20, 50, 220, 60);
        this.loadImg(this.statusBarImgs[this.statusBarIndex]);
    }
}