let level1;


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
            new Jellyfish(1100, 100, 100, 100),
            new Jellyfish(1300, 400, 100, 100),
            new Jellyfish(2200, 300, 100, 100),
            new Jellyfish(2300, 200, 100, 100),
            new Jellyfish(3300, 500, 100, 100),
            new Jellyfish(3500, 350, 100, 100),
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
            new PoisonSpawner(3240, 0, 1080, 720, true),
        ]
    );
}


