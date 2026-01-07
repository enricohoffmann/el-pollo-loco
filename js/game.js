const keyboard = new Keyboard();
let canvas;
let world;
let canvasWidth = 720;
let canvasHeight = 480;


function init() {
    
    const state = loadGameRunningState();
    if(!state || state === false){
        newGameStart();
    } else {
        savedGameStart();
    }

}

function newGameStart() {
    safeGameRunningState(true);
    getCanvas();
    const levelCreator = new LevelCreator(canvas);
    const level = levelCreator.createLevel();

    let t = levelCreator.getCurrentDifficulty;


    world = new World(canvas, keyboard, level, 'orange');
    world.createNewGameObjects();
    world.run();
}

function savedGameStart(){
    safeGameRunningState(true);
    getCanvas();
    const levelCreator = new LevelCreator(canvas);
    const level = levelCreator.createLevelFromState();

    let t = levelCreator.getCurrentDifficulty;

    world = new World(canvas, keyboard, level, 'orange');
    world.character = new Character(world);
    world.character.pos_x = loadCharacterState().character.x;
    world.character.pos_y = loadCharacterState().character.y;
    world.character.energy = loadCharacterState().character.health;
    world.createSavedGameObjects(getSavedGameObjects());
    world.run();
}

function getCanvas(){
    canvas = document.getElementById("canvas");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
}

function getSavedGameObjects(){
    const gameObjects = {
        statusbars: loadStatusbarState(),
        coins: loadCoinState(),
        bottles: loadBottleState(),
    }

    return gameObjects;
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
    safeGameRunningState(false);
    world = null;
    navigateTo('index');
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
    safeGameRunningState(false);
    world = null;
    navigateTo('index');
}



window.addEventListener("keydown", (e) => { keyboard.setKey(e.key, true); });
window.addEventListener("keyup", (e) => { keyboard.setKey(e.key, false); });

window.openGameOverDialog = openGameOverDialog;
window.openGameWinDialog = openGameWinDialog;