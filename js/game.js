const keyboard = new Keyboard();
let canvas;
let world;

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
}


window.addEventListener("keydown", (e) => { keyboard.setKey(e.key, true);});
window.addEventListener("keyup", (e) => { keyboard.setKey(e.key, false);});
