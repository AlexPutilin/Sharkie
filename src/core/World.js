class World {
    ctx;
    canvas;
    controller;
    cameraX = 0;
    projectiles = [];
    poisons = [];
    targetCameraX = 0;
    gameEnd = false;

    /**
     * Initializes the game world and starts the game loop.
     * @param {HTMLCanvasElement} canvas - The canvas element used for rendering.
     * @param {Object} controller - The input controller for player interactions.
     */
    constructor(canvas, controller) {
        this.createInstances(canvas, controller);
        this.setBossToEnemies();
        this.gameLoop();
        this.draw();
    }

    /**
     * Creates all world-related objects (player, enemies, UI elements, etc.).
     * @param {HTMLCanvasElement} canvas - The canvas element used for rendering.
     * @param {Object} controller - The input controller for player interactions.
     */
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

    /**
     * Starts the main game loop with periodic updates.
     */
    gameLoop() {
        setStoppableInterval(() => {
            this.startPlayerLoop();
            this.startProjectileLoop();
            this.checkDestroyEnemy();
            this.checkGameEnd();
        }, 100);
    }

    /**
     * Executes all player-related update checks each frame.
     */
    startPlayerLoop() {
        this.checkPlayerIsCollidingEnemy();
        this.checkPlayerIsCollidingCoins();
        this.checkPlayerIsCollidingPoisons();
        this.checkPlayerIsCollidingSpawner();
    }

    /**
     * Checks collisions between the player and enemies.
     */
    checkPlayerIsCollidingEnemy() {
        this.enemies.forEach(enemy => {
            if (this.player.isColliding(enemy)) {
                if (this.player.isSlapAttacking) {
                    enemy.getHit(100);
                } else {
                    this.player.getHit(20);
                    enemy.onCollision();
                }
                this.checkIsShocked(enemy);
            }
        });
    }

    /**
     * Updates player's shocked state if colliding with a jellyfish.
     * @param {Object} enemy - The enemy object the player collides with.
     */
    checkIsShocked(enemy) {
        if (enemy instanceof Jellyfish) {
            this.player.isShocked = true;
        } else {
            this.player.isShocked = false;
        }
    }

    /**
     * Checks collisions between the player and coins, removes collected coins.
     */
    checkPlayerIsCollidingCoins() {
        this.coins.forEach((coin, index) => {
            if (this.player.isColliding(coin)) {
                coin.playAudioFx(coin.pickUpAudio);
                this.coins.splice(index, 1);
                this.coinbar.reduceStatusbar();
            }
        });
    }

    /**
     * Checks collisions between the player and poison items.
     */
    checkPlayerIsCollidingPoisons() {
        this.poisons.forEach((poison, index) => {
            if (this.player.isColliding(poison)) {
                poison.playAudioFx(poison.pickUpAudio);
                this.poisons.splice(index, 1);
                this.poisonbar.reduceStatusbar();
                this.player.calcPoisonAmount();
            }
        });
    }

    /**
     * Checks collisions between the player and spawners, triggering new spawns.
     */
    checkPlayerIsCollidingSpawner() {
        this.poisonSpawner.forEach(spawner => {
            if (this.player.isColliding(spawner)) {
                spawner.triggerSpawn(this);
            }
        });
    }
  
    /**
     * Executes all projectile-related update checks each frame.
     */
    startProjectileLoop() {
        this.projectiles.forEach((projectile, index) => {
            this.checkProjectileHitEnemy(projectile, index);
            this.checkProjectileOvermap(projectile, index)
        });
    }

    /**
     * Handles projectile collisions with enemies.
     * @param {Object} projectile - The projectile to check.
     * @param {number} index - Index of the projectile in the array.
     */
    checkProjectileHitEnemy(projectile, index) {
        this.enemies.forEach((enemy) => {
            if (projectile.isColliding(enemy)) {
                enemy.getHit(100, projectile.poisoned);
                this.projectiles.splice(index, 1);
            }
        });
    }

    /**
     * Removes projectiles that leave the visible map area.
     * @param {Object} projectile - The projectile to check.
     * @param {number} index - Index of the projectile in the array.
     */
    checkProjectileOvermap(projectile, index) {
        if (projectile.posX > this.player.posX + 920) {
            this.projectiles.splice(index, 1);
        }
    }

    /**
     * Removes enemies flagged for destruction.
     */
    checkDestroyEnemy() {
        this.enemies.forEach((enemy, index) => {
            if (enemy.destroyClass) {
                this.enemies.splice(index, 1);
            }
        });
    }

    /**
     * Checks if the game has ended (player death or boss death).
     */
    checkGameEnd() {
        if (this.player.isDeath() && !this.gameEnd) {
            this.gameEnd = true;
            setTimeout(() => {
                showGameOverScreen();
            }, 2000)
        } else if (this.boss.isDeath() && !this.gameEnd) {
            this.gameEnd = true;
            setTimeout(() => {
                showWinningScreen();
            }, 2000)
        }
    }

    /**
     * Adds the boss to the enemies list.
     */
    setBossToEnemies() {
        this.enemies.push(this.boss);
    }

    /**
     * Renders the entire world and schedules the next frame.
     */
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

    /**
     * Clears the canvas before redrawing.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Translates the camera horizontally.
     */
    translateCamera() {
        this.ctx.translate(this.cameraX, 0);
    }

    /**
     * Resets the camera translation.
     */
    resetCamera() {
        this.ctx.translate(-this.cameraX, 0);
    }

    /**
     * Smoothly interpolates camera movement.
     */
    smoothCameraTransition() {
        this.cameraX += (this.targetCameraX - this.cameraX) * 0.1;
    }

    /**
     * Draws UI elements such as health, poison, and coin bars.
     */
    drawStaticObjects() {
        this.resetCamera();
        this.addToWorld(this.healthbar);
        this.addToWorld(this.poisonbar);
        this.addToWorld(this.coinbar);
    }

    /**
     * Draws a list of game objects.
     * @param {Array<Object>} arr - Array of objects to render.
     */
    drawEachObject(arr = []) {
        arr.forEach(obj => {
            this.addToWorld(obj)
        });
    }

    /**
     * Adds a single object to the canvas.
     * @param {Object} obj - The object to render.
     */
    addToWorld(obj) {
        if (obj.flippedImg) {
            this.flipImg(obj);
        }
        this.ctx.drawImage(obj.img, obj.posX, obj.posY, obj.width, obj.height);
        if (obj.flippedImg) {
            this.flipImgBack(obj);
        }
    }

    /**
     * Flips an object image horizontally.
     * @param {Object} obj - The object to flip.
     */
    flipImg(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        obj.posX = obj.posX * -1;
    }

    /**
     * Restores image orientation after flipping.
     * @param {Object} obj - The object to reset.
     */
    flipImgBack(obj) {
        this.ctx.restore();
        obj.posX = obj.posX * -1;
    }


    // DEBUG:
    // this.drawRec(obj.posX + obj.collisionBox.x, obj.posY + obj.collisionBox.y, obj.collisionBox.w, obj.collisionBox.h);
    drawRec(x, y, w, h) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "red";
        this.ctx.rect(x, y, w, h);
        this.ctx.stroke();
    }
}