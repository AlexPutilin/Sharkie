class PoisonSpawner extends Entity {

    /**
     * Creates a new spawner object that can spawn items in the world.
     * @param {number} x - The x-coordinate of the spawner.
     * @param {number} y - The y-coordinate of the spawner.
     * @param {number} w - The width of the spawner.
     * @param {number} h - The height of the spawner.
     * @param {boolean} loop - Whether the spawner should continuously spawn items.
     */
    constructor(x, y, w, h, loop) {
        super(x, y, w, h);
        this.collisionBox = { x: 0, y: 0, w: w, h: h };
        this.entered = false;
        this.spawned = false;
        this.loop = loop;
        this.intervalId = null;
    }

    /**
     * Triggers a spawn when the player collides with the spawner.
     * Can spawn once or repeatedly, depending on configuration.
     * @param {World} world - The game world where objects are spawned.
     */
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

    /**
     * Spawns a new poison item in the world.
     * @param {World} world - The game world where the poison is added.
     */
    spawn(world) {    
        world.poisons.push(new Poison(this.posX + (this.width  / 2), 0));
    }

    /**
     * Continuously spawns poison items in a fixed time interval.
     * @param {World} world - The game world where poisons are spawned.
     */
    spawnInterval(world) {
        this.spawn(world);
        this.intervalId = setStoppableInterval(() => {
            this.spawn(world);
        }, 13000); 
    }
}