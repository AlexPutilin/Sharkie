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
        this.checkCollisions();
        this.draw();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.enemies.forEach(enemy => {
                if(this.character.isColliding(enemy)) {
                    this.character.takeDmg();                    
                }
            });
        }, 100);
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

    addToWorld(obj) {
        if (obj.flippedImg) {
            this.flipImg(obj);
        }
        this.ctx.drawImage(obj.img, obj.posX, obj.posY, obj.width, obj.height);
        this.drawRec(obj.posX + obj.collisionBox.x,obj.posY + obj.collisionBox.y, obj.collisionBox.w, obj.collisionBox.h)
        if (obj.flippedImg) {
            this.flipImgBack(obj);
        }
    }

    flipImg(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        obj.posX = obj.posX * -1;
    }

    flipImgBack(obj) {
        this.ctx.restore();
        obj.posX = obj.posX * -1;
    }


    // DEBUG:
    drawRec(x, y, w, h) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "red";
        this.ctx.rect(x, y, w, h);
        this.ctx.stroke();
    }
}


// ctx.drawImage(img, x, y, width, height);