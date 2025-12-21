const keyboard = new Keyboard();
let canvas;
let world;
let canvasWidth = 720;
let canvasHeight = 480;

function init() {
    canvas = document.getElementById("canvas");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    const levelCreator = new LevelCreator('easy', canvas);
    const level = levelCreator.createLevel()

    world = new World(canvas, keyboard, level, 'orange');
    //openGameOverDialog();
    
}

function openGameOverDialog() {
    const dialog = document.getElementById('game-over-dialog');
    dialog.height = window.innerHeight;
    dialog.width = window.innerWidth;
    const content = document.getElementById('game-over-content');
    content.width = dialog.width * 0.8;
    content.height = dialog.height * 0.8;
    dialog.showModal();
}

function closeGameOverDialog() {
    const dialog = document.getElementById('game-over-dialog');
    dialog.close();
}

function openGameWinDialog() {
    const dialog = document.getElementById('game-win-dialog');
    dialog.height = window.innerHeight;
    dialog.width = window.innerWidth;
    const content = document.getElementById('game-win-content');
    content.width = dialog.width * 0.8;
    content.height = dialog.height * 0.8;
    dialog.showModal();
}

function closeGameWinDialog() {
    const dialog = document.getElementById('game-win-dialog');
    dialog.close();
    world = null;
}

window.addEventListener("keydown", (e) => { keyboard.setKey(e.key, true);});
window.addEventListener("keyup", (e) => { keyboard.setKey(e.key, false);});

window.openGameOverDialog = openGameOverDialog;
window.openGameWinDialog = openGameWinDialog;