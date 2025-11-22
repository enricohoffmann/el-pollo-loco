const keyboard = new Keyboard();
let canvas;
let world;
let canvasWidth = 720;
let canvasHeight = 480;

function init() {
    canvas = document.getElementById("canvas");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    const levelCreator = new LevelCreator('easy', canvasWidth);
    const level = levelCreator.createLevel()

    world = new World(canvas, keyboard, level,);
    
}


window.addEventListener("keydown", (e) => { keyboard.setKey(e.key, true);});
window.addEventListener("keyup", (e) => { keyboard.setKey(e.key, false);});
