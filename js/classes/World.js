class World {

    ctx;
    canvas;
    cameraX = 0;
    controller;
    backgrounds = [
        new Background('../assets/imgs/background/background_layer0_1.png', 0), 
        new Background('../assets/imgs/background/background_layer1_1.png', 0), 
        new Background('../assets/imgs/background/background_layer2_1.png', 0),
        new Background('../assets/imgs/background/background_layer3_1.png', 0),
        new Background('../assets/imgs/background/background_layer0_2.png', 1080), 
        new Background('../assets/imgs/background/background_layer1_2.png', 1080), 
        new Background('../assets/imgs/background/background_layer2_2.png', 1080),
        new Background('../assets/imgs/background/background_layer3_2.png', 1080),
        new Background('../assets/imgs/background/background_lightflare_1.png', 1080),
        new Background('../assets/imgs/background/background_layer0_1.png', 2160), 
        new Background('../assets/imgs/background/background_layer1_1.png', 2160), 
        new Background('../assets/imgs/background/background_layer2_1.png', 2160),
        new Background('../assets/imgs/background/background_layer3_1.png', 2160),
        new Background('../assets/imgs/background/background_lightflare_2.png', 2160),
        new Background('../assets/imgs/background/background_layer0_2.png', 3240), 
        new Background('../assets/imgs/background/background_layer1_2.png', 3240), 
        new Background('../assets/imgs/background/background_layer2_2.png', 3240),
        new Background('../assets/imgs/background/background_layer3_2.png', 3240),
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
        this.ctx.translate(this.cameraX, 0);
        this.backgrounds.forEach(background => {
            this.addToWorld(background);
        });
        this.addToWorld(this.character);
        this.addToWorld(this.jellyfish);

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