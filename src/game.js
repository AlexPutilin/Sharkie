let canvas;
let controller;
let world;


document.addEventListener("DOMContentLoaded", (event) => {
    canvas = document.getElementById('canvas');
    controller = new Input();
    world = new World(canvas, controller);
})

function initGame() {
    
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
    if (e.key === " ") controller.kSpace = false;
});