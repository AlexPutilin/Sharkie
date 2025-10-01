class Level {
    backgrounds;
    enemies;
    coins;
    spawner;

    /**
     * Creates a new game world instance with given elements.
     * @param {Array<Object>} backgrounds - List of background layers or objects.
     * @param {Array<Object>} enemies - List of enemy objects in the world.
     * @param {Array<Object>} coins - List of coin objects for collection.
     * @param {Object} spawner - Spawner responsible for generating new objects.
     */
    constructor(backgrounds, enemies, coins, spawner) {
        this.backgrounds = backgrounds;
        this.enemies = enemies;
        this.coins = coins;
        this.spawner = spawner;
    }
}