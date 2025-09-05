class Coinbar extends Statusbar {
    statusBarImgs = [
        'assets/imgs/bars/coin/bar_coin_0.png',
        'assets/imgs/bars/coin/bar_coin_20.png',
        'assets/imgs/bars/coin/bar_coin_40.png',
        'assets/imgs/bars/coin/bar_coin_60.png',
        'assets/imgs/bars/coin/bar_coin_80.png',
        'assets/imgs/bars/coin/bar_coin_100.png'
    ];

    constructor() {
        super(20, 100, 220, 60);
        this.loadImg(this.statusBarImgs[this.statusBarIndex]);
    }
}