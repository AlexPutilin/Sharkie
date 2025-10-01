let level1;

/**
 * Initializes the first game level (level1) with backgrounds, enemies, coins, and poison spawners.
 * Sets up a new {@link Level} instance and assigns it to the global `level1` variable.
 *
 * Backgrounds are layered and positioned to create a scrolling environment,
 * enemies (jellyfish, pufferfish) are placed at fixed positions,
 * collectible coins are distributed, and poison spawners are configured.
 *
 */
function initLevel() {
    level1 = new Level(
        [
            new Background(-1080, 0, 1080, 720, 'assets/imgs/background/background_layer0_2.png'), 
            new Background(-1080, 0, 1080, 720, 'assets/imgs/background/background_layer1_2.png'), 
            new Background(-1080, 0, 1080, 720, 'assets/imgs/background/background_layer2_2.png'),
            new Background(-1080, 0, 1080, 720, 'assets/imgs/background/background_layer3_2.png'),
            new Background(0, 0, 1080, 720, 'assets/imgs/background/background_layer0_1.png'), 
            new Background(0, 0, 1080, 720, 'assets/imgs/background/background_layer1_1.png'), 
            new Background(0, 0, 1080, 720, 'assets/imgs/background/background_layer2_1.png'),
            new Background(0, 0, 1080, 720, 'assets/imgs/background/background_layer3_1.png'),
            new Background(1079, 0, 1080, 720, 'assets/imgs/background/background_layer0_2.png'), 
            new Background(1079, 0, 1080, 720, 'assets/imgs/background/background_layer1_2.png'), 
            new Background(1079, 0, 1080, 720, 'assets/imgs/background/background_layer2_2.png'),
            new Background(1079, 0, 1080, 720, 'assets/imgs/background/background_layer3_2.png'),
            new Background(1079, 0, 1080, 720, 'assets/imgs/background/background_lightflare_1.png'),
            new Background(2159, 0, 1080, 720, 'assets/imgs/background/background_layer0_1.png'), 
            new Background(2159, 0, 1080, 720, 'assets/imgs/background/background_layer1_1.png'), 
            new Background(2159, 0, 1080, 720, 'assets/imgs/background/background_layer2_1.png'),
            new Background(2159, 0, 1080, 720, 'assets/imgs/background/background_layer3_1.png'),
            new Background(2159, 0, 1080, 720, 'assets/imgs/background/background_lightflare_2.png'),
            new Background(3239, 0, 1080, 720, 'assets/imgs/background/background_layer0_2.png'), 
            new Background(3239, 0, 1080, 720, 'assets/imgs/background/background_layer1_2.png'), 
            new Background(3239, 0, 1080, 720, 'assets/imgs/background/background_layer2_2.png'),
            new Background(3239, 0, 1080, 720, 'assets/imgs/background/background_layer3_2.png'),
            new Background(4319, 0, 1080, 720, 'assets/imgs/background/background_layer0_1.png'), 
            new Background(4319, 0, 1080, 720, 'assets/imgs/background/background_layer1_1.png'), 
            new Background(4319, 0, 1080, 720, 'assets/imgs/background/background_layer2_1.png'),
            new Background(4319, 0, 1080, 720, 'assets/imgs/background/background_layer3_1.png'),
        ],
        [
            new Jellyfish(1100, 360, 100, 100),
            new Pufferfish(1400, 200, 100, 70),
            new Jellyfish(2000, 360, 100, 100),
            new Pufferfish(2400, 400, 100, 70),
            new Jellyfish(2700, 360, 100, 100),
            new Pufferfish(3000, 600, 100, 70),
            new Jellyfish(3300, 360, 100, 100),
            new Jellyfish(3500, 360, 100, 100),
        ],
        [
            new Coin(500, 500),
            new Coin(800, 200),
            new Coin(1200, 400),
            new Coin(2000, 300),
            new Coin(2500, 600),
        ],
        [
            new PoisonSpawner(1000, 0, 200, 720, false),
            new PoisonSpawner(2000, 0, 200, 720, false),
            new PoisonSpawner(4320, 0, 1080, 720, true),
        ]
    );
}


