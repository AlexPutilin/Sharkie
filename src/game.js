let canvas;
let controller;
let world;
let intervalIds = [];


function initGame() {
    canvas = document.getElementById('canvas');
    const gameWindow = document.getElementById('game-window');
    const menu = document.getElementById('menu');
    toggleDisplayNone(menu);
    toggleDisplayNone(gameWindow);
    startGame();
}


function startGame() {
    if (world) return;
    controller = new Input();
    initLevel();
    world = new World(canvas, controller);
}


function stopGame() {
    if (!world) return;
    stopIntervals();
    world.enemies = [];
    world.coins = [];
    world = null;
    controller = null;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function backToMenu() {
    const gameWindow = document.getElementById('game-window');
    const menu = document.getElementById('menu');
    stopGame();
    toggleDisplayNone(menu);
    toggleDisplayNone(gameWindow);
}


window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") controller.kLeft = true;
    if (e.key === "ArrowUp") controller.kUp = true;
    if (e.key === "ArrowRight") controller.kRight = true;
    if (e.key === "ArrowDown") controller.kDown = true;
    if (e.key === " " && !controller.kSpace) {
        controller.kSpace = true;
        controller.kSpacePressedOnce = true;
    }
});


window.addEventListener('keyup', (e) => {
    if (e.key === "ArrowLeft") controller.kLeft = false;
    if (e.key === "ArrowUp") controller.kUp = false;
    if (e.key === "ArrowRight") controller.kRight = false;
    if (e.key === "ArrowDown") controller.kDown = false;
    if (e.key === " ") {controller.kSpace = false;}
});


function setStoppableInterval(fn, ms) {
    const id = setInterval(fn, ms);
    intervalIds.push(id);
    return id;
}


function stopIntervals() {
    intervalIds.forEach(clearInterval);
}