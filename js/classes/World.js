class World {

    ctx;
    canvas;
    controller;
    backgrounds = [
        new Background('../assets/imgs/background/background_water_1.png'), 
        new Background('../assets/imgs/background/background_5.png'), 
        new Background('../assets/imgs/background/background_floor_3.png')
    ];
    character = new PlayerCharacter();
    jellyfish = new Jellyfish();

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
        this.backgrounds.forEach(background => {
            this.addToWorld(background);
        });
        this.addToWorld(this.character);
        this.addToWorld(this.jellyfish);

        requestAnimationFrame(() => {
            this.draw();
        });
    }

    addToWorld(object) {
        this.ctx.drawImage(object.img, object.posX, object.posY, object.width, object.height);
    }
}


// ctx.drawImage(img, x, y, width, height);