class Healtbar extends GameObject {
    statusBarImgs = [
        'assets/imgs/bars/life/bar_life_100.png',
        'assets/imgs/bars/life/bar_life_80.png',
        'assets/imgs/bars/life/bar_life_60.png',
        'assets/imgs/bars/life/bar_life_40.png',
        'assets/imgs/bars/life/bar_life_20.png',
        'assets/imgs/bars/life/bar_life_0.png',
    ];
    statusBarIndex = 0;

    constructor() {
        super(20, 0, 300, 75);
        this.loadImg(this.statusBarImgs[this.statusBarIndex]);
    }

    reduceStatusbar() {
        this.statusBarIndex = Math.min(this.statusBarImgs.length-1, this.statusBarIndex + 1);
        this.loadImg(this.statusBarImgs[this.statusBarIndex])
    }
}