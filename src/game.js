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
    updateScreenMessageVisibility();
}


function startGame() {
    if (world) return;
    resetScreens();
    controller = new Input();
    initControls();
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


function resetScreens() {
    const winningScreen = document.getElementById('winning-screen');
    const gameOverScreen = document.getElementById('gameover-screen');
    const hud = document.getElementById('hud');
    if (!winningScreen.classList.contains('d-none')) toggleDisplayNone(winningScreen);
    if (!gameOverScreen.classList.contains('d-none')) toggleDisplayNone(gameOverScreen);
    if (canvas.classList.contains('d-none')) toggleDisplayNone(canvas);
    if (hud.classList.contains('d-none')) toggleDisplayNone(hud);
}


function showWinningScreen() {
    stopGame();
    const winningScreen = document.getElementById('winning-screen');
    const hud = document.getElementById('hud');
    toggleDisplayNone(hud);
    toggleDisplayNone(canvas);
    toggleDisplayNone(winningScreen);
}


function showGameOverScreen() {
    stopGame();
    const gameOverScreen = document.getElementById('gameover-screen');
    const hud = document.getElementById('hud');
    toggleDisplayNone(hud);
    toggleDisplayNone(canvas);
    toggleDisplayNone(gameOverScreen);
}


function backToMenu() {
    const gameWindow = document.getElementById('game-window');
    const menu = document.getElementById('menu');
    stopGame();
    toggleDisplayNone(menu);
    toggleDisplayNone(gameWindow);
    updateScreenMessageVisibility();
}


function initControls() {
    setupKeyboardControls();
    setupMobileControls();
}


function setupKeyboardControls() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}


function handleKeyDown(e) {
    if (!controller) return;
    if (e.key === "ArrowLeft") controller.kLeft = true;
    if (e.key === "ArrowUp") controller.kUp = true;
    if (e.key === "ArrowRight") controller.kRight = true;
    if (e.key === "ArrowDown") controller.kDown = true;
    if (e.key === " " && !controller.kSpace) {
        controller.kSpace = true;
        controller.kSpacePressedOnce = true;
    }
}


function handleKeyUp(e) {
    if (!controller) return;
    if (e.key === "ArrowLeft") controller.kLeft = false;
    if (e.key === "ArrowUp") controller.kUp = false;
    if (e.key === "ArrowRight") controller.kRight = false;
    if (e.key === "ArrowDown") controller.kDown = false;
    if (e.key === " ") controller.kSpace = false;
}


function setupMobileControls() {
    const btns = [
        { id: 'mobile-btn-up',    prop: 'kUp' },
        { id: 'mobile-btn-down',  prop: 'kDown' },
        { id: 'mobile-btn-left',  prop: 'kLeft' },
        { id: 'mobile-btn-right', prop: 'kRight' },
        { id: 'mobile-btn-space', prop: 'kSpace', isSpace: true }
    ];
    btns.forEach(({ id, prop, isSpace }) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        addMobileEvents(btn, prop, isSpace);
    });
}


function addMobileEvents(btn, prop, isSpace) {
    btn.addEventListener('touchstart', (e) => handleMobileDown(e, btn, prop, isSpace));
    btn.addEventListener('touchend', (e) => handleMobileUp(e, btn, prop));
    btn.addEventListener('pointerdown', (e) => handleMobileDown(e, btn, prop, isSpace));
    btn.addEventListener('pointerup', (e) => handleMobileUp(e, btn, prop));
    btn.addEventListener('pointercancel', () => handleMobileUp(null, btn, prop));
    btn.addEventListener('mousedown', (e) => handleMobileDown(e, btn, prop, isSpace));
    btn.addEventListener('mouseup', (e) => handleMobileUp(e, btn, prop));
    btn.addEventListener('mouseleave', () => handleMobileUp(null, btn, prop));
}


function handleMobileDown(e, btn, prop, isSpace) {
    if (!controller) return;
    controller[prop] = true;
    btn.classList.add('game-key-pressed');
    if (isSpace) controller.kSpacePressedOnce = true;
}


function handleMobileUp(e, btn, prop) {
    if (e) e.preventDefault();
    if (!controller) return;
    controller[prop] = false;
    btn.classList.remove('game-key-pressed');
}


function setStoppableInterval(fn, ms) {
    const id = setInterval(fn, ms);
    intervalIds.push(id);
    return id;
}


function stopIntervals() {
    intervalIds.forEach(clearInterval);
}