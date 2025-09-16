class PoisonSpawner extends Entity {
    constructor(x, y, w, h, loop) {
        super(x, y, w, h);
        this.collisionBox = { x: 0, y: 0, w: w, h: h };
        this.entered = false;
        this.spawned = false;
        this.loop = loop;
        this.intervalId = null;
    }

    triggerSpawn(world) {
        if (this.entered) return;
        this.entered = true;
        if (this.loop) {
            this.spawnInterval(world);
        } else {
            if (!this.spawned) {
                this.spawn(world);
                this.spawned = true;
            }
        }
    }

    spawn(world) {    
        world.poisons.push(new Poison(this.posX + (this.width  / 2), 0));
    }

    spawnInterval(world) {
        this.intervalId = setInterval(() => {
            this.spawn(world)
        }, 10000);
    }

    stopInterval() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.entered = false;
        }
    }

}