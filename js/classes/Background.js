class Background extends Actor {
    constructor(imgPath, x) {
        super(x, 0, 1080, 720);
        this.loadImg(imgPath);
    }
    
}