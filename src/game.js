let canvas;
let controller;
let world;
let intervalIds = [];
let soundEffects = [];
let soundsMuted = false;
const backgroundAudio = new Audio('assets/audio/audio-underwater-ambient.mp3');
registerSound([backgroundAudio]);

/**
 * Initializes the game by setting up the canvas, toggling menus, and starting the game loop.
 * @returns {void}
 */
function initGame() {
    canvas = document.getElementById('canvas');
    const gameWindow = document.getElementById('game-window');
    const menu = document.getElementById('menu');
    toggleDisplayNone(menu);
    toggleDisplayNone(gameWindow);
    startGame();
    updateScreenMessageVisibility();
}

/**
 * Starts the game if no world instance exists.
 * Sets up input, controls, level, and initializes the game world.
 * @returns {void}
 */
function startGame() {
    if (world) return;
    resetScreens();
    controller = new Input();
    initControls();
    initLevel();
    world = new World(canvas, controller);
    startBackgroundAudio();
}

/**
 * Stops the game if running, clears intervals, audio, and canvas.
 * Resets game world and controller references.
 * @returns {void}
 */
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

/**
 * Starts looping background music from the beginning.
 * @returns {void}
 */
function startBackgroundAudio() {
    backgroundAudio.currentTime = 0;
    backgroundAudio.loop = true;
    backgroundAudio.play();
}

/**
 * Stops background music playback.
 * @returns {void}
 */
function stopBackgroundAudio() {
    backgroundAudio.pause();
}

/**
 * Resets the state of game-related screens (winning, game over, HUD, canvas).
 * Ensures correct visibility before starting a new game.
 * @returns {void}
 */
function resetScreens() {
    const winningScreen = document.getElementById('winning-screen');
    const gameOverScreen = document.getElementById('gameover-screen');
    const hud = document.getElementById('hud');
    if (!winningScreen.classList.contains('d-none')) toggleDisplayNone(winningScreen);
    if (!gameOverScreen.classList.contains('d-none')) toggleDisplayNone(gameOverScreen);
    if (canvas.classList.contains('d-none')) toggleDisplayNone(canvas);
    if (hud.classList.contains('d-none')) toggleDisplayNone(hud);
}

/**
 * Displays the winning screen and hides the HUD and canvas.
 * Stops the game before showing the screen.
 * @returns {void}
 */
function showWinningScreen() {
    stopGame();
    const winningScreen = document.getElementById('winning-screen');
    const hud = document.getElementById('hud');
    toggleDisplayNone(hud);
    toggleDisplayNone(canvas);
    toggleDisplayNone(winningScreen);
}

/**
 * Displays the game over screen and hides the HUD and canvas.
 * Stops the game before showing the screen.
 * @returns {void}
 */
function showGameOverScreen() {
    stopGame();
    const gameOverScreen = document.getElementById('gameover-screen');
    const hud = document.getElementById('hud');
    toggleDisplayNone(hud);
    toggleDisplayNone(canvas);
    toggleDisplayNone(gameOverScreen);
}

/**
 * Returns the player back to the main menu.
 * Stops the game and toggles menu visibility.
 * @returns {void}
 */
function backToMenu() {
    const gameWindow = document.getElementById('game-window');
    const menu = document.getElementById('menu');
    stopGame();
    toggleDisplayNone(menu);
    toggleDisplayNone(gameWindow);
    updateScreenMessageVisibility();
}

/**
 * Initializes input controls for both keyboard and mobile.
 * @returns {void}
 */
function initControls() {
    setupKeyboardControls();
    setupMobileControls();
}

/**
 * Sets up event listeners for keyboard input.
 * @returns {void}
 */
function setupKeyboardControls() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

/**
 * Handles keydown events and updates the controller state accordingly.
 * @param {KeyboardEvent} e - The keyboard event.
 * @returns {void}
 */
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

/**
 * Handles keyup events and updates the controller state accordingly.
 * @param {KeyboardEvent} e - The keyboard event.
 * @returns {void}
 */
function handleKeyUp(e) {
    if (!controller) return;
    if (e.key === "ArrowLeft") controller.kLeft = false;
    if (e.key === "ArrowUp") controller.kUp = false;
    if (e.key === "ArrowRight") controller.kRight = false;
    if (e.key === "ArrowDown") controller.kDown = false;
    if (e.key === "y") controller.kY = false;
    if (e.key === "x") controller.kX = false;
}

/**
 * Sets up touch and pointer event listeners for mobile controls.
 * @returns {void}
 */
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

/**
 * Attaches mobile input events (touch, pointer, mouse) to a button element.
 * @param {HTMLElement} btn - The button element to attach events to.
 * @param {string} prop - The controller property to toggle.
 * @param {boolean} [isY] - Whether the button triggers the Y action.
 * @param {boolean} [isX] - Whether the button triggers the X action.
 * @returns {void}
 */
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

/**
 * Handles the press action for mobile input buttons.
 * Updates controller state and visual button press feedback.
 * @param {Event} e - The event object.
 * @param {HTMLElement} btn - The button element pressed.
 * @param {string} prop - The controller property to toggle.
 * @param {boolean} [isY] - Whether the button triggers the Y action.
 * @param {boolean} [isX] - Whether the button triggers the X action.
 * @returns {void}
 */
function handleMobileDown(e, btn, prop, isY, isX) {
    if (!controller) return;
    controller[prop] = true;
    btn.classList.add('game-key-pressed');
    if (isY) controller.kYPressedOnce = true;
    if (isX) controller.kXPressedOnce = true;
}

/**
 * Handles the release action for mobile input buttons.
 * Updates controller state and visual button release feedback.
 * @param {Event|null} e - The event object, or null for forced release.
 * @param {HTMLElement} btn - The button element released.
 * @param {string} prop - The controller property to reset.
 * @returns {void}
 */
function handleMobileUp(e, btn, prop) {
    if (e) e.preventDefault();
    if (!controller) return;
    controller[prop] = false;
    btn.classList.remove('game-key-pressed');
}

/**
 * Creates a stoppable interval that can later be cleared with stopIntervals().
 * Stores the interval ID for global management.
 * @param {Function} fn - The function to execute repeatedly.
 * @param {number} ms - The interval duration in milliseconds.
 * @returns {number} The ID of the created interval.
 */
function setStoppableInterval(fn, ms) {
    const id = setInterval(fn, ms);
    intervalIds.push(id);
    return id;
}

/**
 * Stops and clears all registered intervals created by setStoppableInterval().
 * @returns {void}
 */
function stopIntervals() {
    intervalIds.forEach(clearInterval);
}

/**
 * Registers one or more audio elements for sound effect management.
 * Applies the current mute state to them.
 * @param {HTMLAudioElement[]} [audios=[]] - The audio elements to register.
 * @returns {void}
 */
function registerSound(audios = []) {
    audios.forEach(audio => {
        soundEffects.push(audio);
        audio.volume = soundsMuted ? 0 : 1;
    });
}

/**
 * Toggles sound effects on or off.
 * Updates the mute button's state and adjusts audio volumes accordingly.
 * @param {HTMLElement} btn - The mute button element.
 * @returns {void}
 */
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