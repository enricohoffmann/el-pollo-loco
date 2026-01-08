const keyboard = new Keyboard();
let canvas;
let ctx;
let world;
let canvasWidth = 720;
let canvasHeight = 480;


function init() {

    const state = loadGameRunningState();
    canvas = document.getElementById("canvas");
    if (!state || state === false) {
        newGameStart();
    } else {
        savedGameStart();
    }

}

function newGameStart() {
    safeGameRunningState(true);
    const levelCreator = new LevelCreator(canvas);
    const level = levelCreator.createLevel();

    let t = levelCreator.getCurrentDifficulty;


    world = new World(canvas, keyboard, level, 'orange');

    console.log(canvas.width, canvas.height);
    console.log(canvas.getBoundingClientRect());


    world.createNewGameObjects();
    world.run();
}

function savedGameStart() {
    safeGameRunningState(true);
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

function getCanvas() {
    canvas = document.getElementById("canvas");

    const styles = getComputedStyle(canvas);
    canvas.width = parseInt(styles.width);
    canvas.height = parseInt(styles.height);

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    console.log(canvas.width, canvas.height);
    console.log(canvas.getBoundingClientRect());
}

function getSavedGameObjects() {
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
    lockResize();
    dialog.showModal();
}

function closeGameOverDialog() {
    const dialog = document.getElementById('game-over-dialog');
    dialog.close();
    safeGameRunningState(false);
    world = null;
    unlockResize();
    navigateTo('index');
}

function openGameWinDialog() {
    const dialog = document.getElementById('game-win-dialog');
    dialog.height = window.innerHeight;
    dialog.width = window.innerWidth;
    const content = document.getElementById('game-win-content');
    content.width = dialog.width * 0.8;
    content.height = dialog.height * 0.8;
    lockResize();
    dialog.showModal();
}

function closeGameWinDialog() {
    const dialog = document.getElementById('game-win-dialog');
    dialog.close();
    safeGameRunningState(false);
    world = null;
    unlockResize();
    navigateTo('index');
}

function lockResize() {
    document.body.classList.add('lock-resize');
}

function unlockResize() {
    document.body.classList.remove('lock-resize');
}

window.addEventListener("keydown", (e) => { keyboard.setKey(e.key, true); });
window.addEventListener("keyup", (e) => { keyboard.setKey(e.key, false); });

window.openGameOverDialog = openGameOverDialog;
window.openGameWinDialog = openGameWinDialog;