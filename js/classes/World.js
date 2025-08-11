class World {

    ctx;
    player = new PlayerCharacter();

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        this.ctx.drawImage(this.player.img, this.player.posX, this.player.posY, this.player.width, this.player.height);
    }
}


// ctx.drawImage(img, x, y, width, height);