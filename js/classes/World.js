class World {

    ctx;
    canvas;
    cameraX = 0;
    controller;
    backgrounds = level1.backgrounds;
    enemies = level1.enemies;
    character = new PlayerCharacter();


    constructor(canvas, controller) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controller = controller;
        this.setWorld();
        this.draw();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.backgrounds.forEach(background => {
            this.addToWorld(background);
        });
        this.enemies.forEach(enemie => {
            this.addToWorld(enemie);
        });
        this.addToWorld(this.character);

        this.ctx.translate(-this.cameraX, 0);

        requestAnimationFrame(() => {
            this.draw();
        });
    }

    addToWorld(object) {
        if (object.flippedImg) {
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1, 1);
            object.posX = object.posX * -1;
        }
        this.ctx.drawImage(object.img, object.posX, object.posY, object.width, object.height);
        if (object.flippedImg) {
            this.ctx.restore();
            object.posX = object.posX * -1;
        }
    }
}


// ctx.drawImage(img, x, y, width, height);