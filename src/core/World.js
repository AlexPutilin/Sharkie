class World {
    ctx;
    canvas;
    controller;
    cameraX = 0;
    projectiles = [];
    poisons = [];
    targetCameraX = 0;

    constructor(canvas, controller) {
        this.createInstances(canvas, controller);
        this.setBossToEnemies();
        this.gameLoop();
        this.draw();
    }

    createInstances(canvas, controller) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controller = controller;
        this.player = new Sharkie(this);
        this.boss = new Whale(this);
        this.backgrounds = level1.backgrounds;
        this.enemies = level1.enemies;
        this.coins = level1.coins;
        this.poisonSpawner = level1.spawner;
        this.healthbar = new Healthbar();
        this.poisonbar = new Poisonbar();
        this.coinbar = new Coinbar();
    }

    gameLoop() {
        setStoppableInterval(() => {
            this.startPlayerLoop();
            this.startProjectileLoop();
            this.checkDestroyEnemy();
        }, 100);
    }

    startPlayerLoop() {
        this.checkPlayerIsCollidingEnemy();
        this.checkPlayerIsCollidingCoins();
        this.checkPlayerIsCollidingPoisons();
        this.checkPlayerIsCollidingSpawner();
    }

    checkPlayerIsCollidingEnemy() {
        this.enemies.forEach(enemy => {
            if (this.player.isColliding(enemy)) {
                this.player.getHit(20);
                enemy.onCollision();
            }
        });
    }

    checkPlayerIsCollidingCoins() {
        this.coins.forEach((coin, index) => {
            if (this.player.isColliding(coin)) {
                this.coins.splice(index, 1);
                this.coinbar.reduceStatusbar();
            }
        });
    }

    checkPlayerIsCollidingPoisons() {
        this.poisons.forEach((poison, index) => {
            if (this.player.isColliding(poison)) {
                this.poisons.splice(index, 1);
                this.poisonbar.reduceStatusbar();
                this.player.calcPoisonAmount();
            }
        });
    }

    checkPlayerIsCollidingSpawner() {
        this.poisonSpawner.forEach(spawner => {
            if (this.player.isColliding(spawner)) {
                spawner.triggerSpawn(this);
            }
        });
    }
  
    startProjectileLoop() {
        this.projectiles.forEach((projectile, index) => {
            this.checkProjectileHitEnemy(projectile, index);
            this.checkProjectileOvermap(projectile, index)
        });
    }

    checkProjectileHitEnemy(projectile, index) {
        this.enemies.forEach((enemy) => {
            if (projectile.isColliding(enemy)) {
                enemy.getHit(100, projectile.poisoned);
                this.projectiles.splice(index, 1);
            }
        });
    }

    checkProjectileOvermap(projectile, index) {
        if (projectile.posX > this.player.posX + 920) {
            this.projectiles.splice(index, 1);
        }
    }

    checkDestroyEnemy() {
        this.enemies.forEach((enemy, index) => {
            if (enemy.destroyClass) {
                this.enemies.splice(index, 1);
            }
        });
    }

    setBossToEnemies() {
        this.enemies.push(this.boss);
    }

    draw() {
        this.clearCanvas();
        this.smoothCameraTransition();
        this.translateCamera();
        this.drawEachObject(this.backgrounds);
        this.drawEachObject(this.enemies);
        this.drawEachObject(this.coins);
        this.drawEachObject(this.poisonSpawner);
        this.drawEachObject(this.poisons);
        this.drawEachObject(this.projectiles);
        this.addToWorld(this.player);
        this.drawStaticObjects();
        requestAnimationFrame(() => this.draw());
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    translateCamera() {
        this.ctx.translate(this.cameraX, 0);
    }

    resetCamera() {
        this.ctx.translate(-this.cameraX, 0);
    }

    smoothCameraTransition() {
        this.cameraX += (this.targetCameraX - this.cameraX) * 0.1;
    }

    drawStaticObjects() {
        this.resetCamera();
        this.addToWorld(this.healthbar);
        this.addToWorld(this.poisonbar);
        this.addToWorld(this.coinbar);
    }

    drawEachObject(arr = []) {
        arr.forEach(obj => {
            this.addToWorld(obj)
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