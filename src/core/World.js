class World {
    ctx;
    canvas;
    cameraX = 0;
    controller;
    backgrounds = level1.backgrounds;
    enemies = level1.enemies;
    coins = level1.coins;
    // poison = level1.poisons;
    poisonSpawner = level1.spawner;
    healthbar = new Healthbar();
    poisonbar = new Poisonbar();
    coinbar = new Coinbar();
    projectiles = [];
    poisons = [];

    constructor(canvas, controller) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controller = controller;
        this.player = new Sharkie(this);
        // this.initWorldRef();
        this.gameLoop();
        this.draw();
    }

    gameLoop() {
        setInterval(() => {
            this.checkPlayerCollisions();
            this.checkProjectileCollisions();
            this.checkDestroyEnemy();
        }, 100);
    }

    checkPlayerCollisions() {
        this.enemies.forEach(enemy => {
            if (this.player.isColliding(enemy)) {
                this.player.getHit();
                enemy.onCollision();
            }
        });
        this.coins.forEach((coin, index) => {
            if (this.player.isColliding(coin)) {
                this.coins.splice(index, 1);
                this.coinbar.reduceStatusbar();
            }
        });
        this.poisons.forEach((poison, index) => {
            if (this.player.isColliding(poison)) {
                this.poisons.splice(index, 1);
                this.poisonbar.reduceStatusbar();
                this.player.calcPoisonAmount();
            }
        });
        this.poisonSpawner.forEach(spawner => {
            if (this.player.isColliding(spawner)) {
                spawner.triggerSpawn(this);
            } else {
                spawner.stopInterval();
            }
        });
    }
  
    checkProjectileCollisions() {
        this.projectiles.forEach((projectile, index) => {
            this.enemies.forEach((enemy) => {
                if (projectile.isColliding(enemy)) {
                    enemy.takeDmg(100);
                    this.projectiles.splice(index, 1);
                }
            });
        });
    }

    checkDestroyEnemy() {
        this.enemies.forEach((enemy, index) => {
            if (enemy.destroyClass) {
                this.enemies.splice(index, 1);
            }
        });
    }

    // initWorldRef() {
    //     this.poisonSpawner.forEach(spawner => {
    //         this.setReferenceToWorld(spawner);
    //     });
    // }

    // setReferenceToWorld(obj) {
    //     obj.world = this;
    // }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        
        this.backgrounds.forEach(background => {
            this.addToWorld(background);
        });
        this.enemies.forEach(enemie => {
            this.addToWorld(enemie);
        });
        this.coins.forEach(coin => {
            this.addToWorld(coin);
        });
        this.poisonSpawner.forEach(spawn => {
            this.addToWorld(spawn);
        })
        this.poisons.forEach(poison => {
            this.addToWorld(poison);
        });
        this.projectiles.forEach(projectile => {
            this.addToWorld(projectile);
        });
        this.addToWorld(this.player);
        this.ctx.translate(-this.cameraX, 0);
        this.addToWorld(this.healthbar);
        this.addToWorld(this.poisonbar);
        this.addToWorld(this.coinbar);
        this.ctx.translate(this.cameraX, 0);
        this.ctx.translate(-this.cameraX, 0);
        requestAnimationFrame(() => this.draw());
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