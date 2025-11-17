const keyboard = new Keyboard();
let canvas;
let world;
let canvasWidth = 720;
let canvasHeight = 480;

function init() {
    canvas = document.getElementById("canvas");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    world = new World(canvas, keyboard);
    
}


window.addEventListener("keydown", (e) => { keyboard.setKey(e.key, true);});
window.addEventListener("keyup", (e) => { keyboard.setKey(e.key, false);});
