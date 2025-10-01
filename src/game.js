let canvas;
let controller;
let world;
let intervalIds = [];
let soundEffects = [];
let soundsMuted = false;
const backgroundAudio = new Audio('assets/audio/audio-underwater-ambient.mp3');
registerSound([backgroundAudio]);


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
    startBackgroundAudio();
}


function stopGame() {
    if (!world) return;
    stopIntervals();
    stopBackgroundAudio();
    world.enemies = [];
    world.coins = [];
    world = null;
    controller = null;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function startBackgroundAudio() {
    backgroundAudio.currentTime = 0;
    backgroundAudio.loop = true;
    backgroundAudio.play();
}


function stopBackgroundAudio() {
    backgroundAudio.pause();
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
    if (e.key === "y" && !controller.kY) {
        controller.kY = true;
        controller.kYPressedOnce = true;
    }
    if (e.key === "x" && !controller.kX) {
        controller.kX = true;
        controller.kXPressedOnce = true;
    }
}


function handleKeyUp(e) {
    if (!controller) return;
    if (e.key === "ArrowLeft") controller.kLeft = false;
    if (e.key === "ArrowUp") controller.kUp = false;
    if (e.key === "ArrowRight") controller.kRight = false;
    if (e.key === "ArrowDown") controller.kDown = false;
    if (e.key === "y") controller.kY = false;
    if (e.key === "x") controller.kX = false;
}


function setupMobileControls() {
    const btns = [
        { id: 'mobile-btn-up',    prop: 'kUp' },
        { id: 'mobile-btn-down',  prop: 'kDown' },
        { id: 'mobile-btn-left',  prop: 'kLeft' },
        { id: 'mobile-btn-right', prop: 'kRight' },
        { id: 'mobile-btn-y', prop: 'kY', isY: true },
        { id: 'mobile-btn-x', prop: 'kX', isX: true}
    ];
    btns.forEach(({ id, prop, isY, isX }) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        addMobileEvents(btn, prop, isY, isX);
    });
}


function addMobileEvents(btn, prop, isY, isX) {
    btn.addEventListener('touchstart', (e) => handleMobileDown(e, btn, prop, isY, isX));
    btn.addEventListener('touchend', (e) => handleMobileUp(e, btn, prop));
    btn.addEventListener('pointerdown', (e) => handleMobileDown(e, btn, prop, isY, isX));
    btn.addEventListener('pointerup', (e) => handleMobileUp(e, btn, prop));
    btn.addEventListener('pointercancel', () => handleMobileUp(null, btn, prop));
    btn.addEventListener('mousedown', (e) => handleMobileDown(e, btn, prop, isY, isX));
    btn.addEventListener('mouseup', (e) => handleMobileUp(e, btn, prop));
    btn.addEventListener('mouseleave', () => handleMobileUp(null, btn, prop));
}


function handleMobileDown(e, btn, prop, isY, isX) {
    if (!controller) return;
    controller[prop] = true;
    btn.classList.add('game-key-pressed');
    if (isY) controller.kYPressedOnce = true;
    if (isX) controller.kXPressedOnce = true;
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


function registerSound(audios = []) {
    audios.forEach(audio => {
        soundEffects.push(audio);
        audio.volume = soundsMuted ? 0 : 1;
    });
}


function toggleSounds(btn) {
    if (soundsMuted) {
        btn.classList.remove('btn-mute-active');
        soundEffects.forEach(audio => audio.volume = 1);
        soundsMuted = false;
    } else {
        btn.classList.add('btn-mute-active');
        soundEffects.forEach(audio => audio.volume = 0);
        soundsMuted = true;
    }
}


function muteSounds() {
    soundEffects.forEach(audio => audio.volume = 0);
}


function unmuteSounds() {
    soundEffects.forEach(audio => audio.volume = 1);
}