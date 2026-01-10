let keyboard;
let canvas;
let ctx;
let world;
let canvasWidth = 720;
let canvasHeight = 480;
let pause = false;
let muted = false;
let isFullScreen = false;
let gameSettings;
let isControlBind = false;
let audioManager = new AudioManager();
let gameIsEnded = false;


const controls = {
    pause: {
        buttonId: 'pauseButton',
        action: pauseGame
    },
    mute: {
        buttonId: 'muteButton',
        action: toggleMute
    },
    fullScreen: {
        buttonId: 'fullScreenButton',
        action: toggleFullScreen
    },
    reload: {
        buttonId: 'reloadButton',
        action: reloadGame
    }
}


function init() {
    gameIsEnded = loadIsGameEnded() || false;
    if(gameIsEnded) {
        navigateTo('index');
        return;
    }

    const state = loadGameRunningState();
    loadInitialAssets();
    canvas = document.getElementById("canvas");

    if (!state || state === false) {
        newGameStart();
    } else {
        savedGameStart();
    }

}


function loadInitialAssets() {
    keyboard = new Keyboard();
    pause = loadPauseState();
    gameSettings = loadGameSettings();
    togglePauseButtonIcon();
    audioSettingsInit();
    updateDifficultyState();
    bindControls();
    loadAudio();
}

function bindControls() {
    if (isControlBind) { return; }
    isControlBind = true;

    for (const control in controls) {
        const button = document.getElementById(controls[control].buttonId);
        if (button) {
            button.addEventListener('click', controls[control].action);
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                controls[control].action();
            });
        }
    }
}

function audioSettingsInit() {
    if (gameSettings) {
        muted = gameSettings.audioSetting === 'Audio Off' ? true : false;
    }
    toggleMuteButtonIcon();

}

function loadAudio() {
    audioManager.loadBackgroundMusic('../audio/retro-game-402454.mp3');
}


function updateDifficultyState() {
    const difficultyStateElement = document.getElementById('difficultyState');
    if (difficultyStateElement && gameSettings) {
        difficultyStateElement.textContent = `difficulty: ${gameSettings.difficulty}`;
    }
}


function newGameStart() {
    safeGameRunningState(true);
    const levelCreator = new LevelCreator(canvas);
    const level = levelCreator.createLevel();
    const config = levelCreator.getCurrentameSettings;
    world = new World(canvas, keyboard, level, config.theme.toLowerCase(), audioManager);
    world.createNewGameObjects();
    world.run();
}

function savedGameStart() {
    safeGameRunningState(true);
    const levelCreator = new LevelCreator(canvas);
    const level = levelCreator.createLevelFromState();
    const config = levelCreator.getCurrentameSettings;
    world = new World(canvas, keyboard, level, config.theme.toLowerCase(), audioManager);
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

function pauseGame() {
    pause = !pause;
    togglePauseButtonIcon();
    safePauseState(pause);
}

function isGamePaused() {
    return pause;
}

function togglePauseButtonIcon() {
    const pauseButtonDiv = document.querySelector('#pauseButton div');
    if (!pause) {
        pauseButtonDiv.classList.remove('icon-pause');
        pauseButtonDiv.classList.add('icon-play');
    } else {
        pauseButtonDiv.classList.remove('icon-play');
        pauseButtonDiv.classList.add('icon-pause');
    }
}

function reloadGame() {

    if (isGamePaused()) { return; }

    if (world) {
        clearInterval(world.runInterval);
        world = null;
        clearGameState();
        init();
    }

}

function toggleMute() {
    muted = !muted;
    gameSettings.audioSetting = muted ? 'Audio Off' : 'Audio On';
    safeGameSettings(gameSettings);
    toggleMuteButtonIcon();
    audioManager.toggleMusic(!muted);
    audioManager.toggleSFX(!muted);
}

function toggleMuteButtonIcon() {
    const muteButtonDiv = document.querySelector('#muteButton div');
    if (muted) {
        muteButtonDiv.classList.remove('icon-audio-onh');
        muteButtonDiv.classList.add('icon-audio-off');
    } else {
        muteButtonDiv.classList.remove('icon-audio-off');
        muteButtonDiv.classList.add('icon-audio-on');
    }

}

function isGameMuted() {
    return muted;
}

function toggleFullScreen() {
    isFullScreen = !isFullScreen;
    const gameContainer = document.querySelector('.main-game');
    if (isFullScreen) {
        openFullscreen(gameContainer);
        toggleFullScreenButtonIcon(true);
    } else {
        closeFullscreen();
        toggleFullScreenButtonIcon(false);
    }

}

function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { 
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { 
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function toggleFullScreenButtonIcon(isFullScreen) {
    const fullScreenButtonDiv = document.querySelector('#fullScreenButton div');
    if (isFullScreen) {
        fullScreenButtonDiv.classList.remove('icon-fullscreen');
        fullScreenButtonDiv.classList.add('icon-exit-fullscreen');
    } else {
        fullScreenButtonDiv.classList.remove('icon-exit-fullscreen');
        fullScreenButtonDiv.classList.add('icon-fullscreen');
    }
}





window.addEventListener("keydown", (e) => { keyboard.setKey(e.key, true); });
window.addEventListener("keyup", (e) => { keyboard.setKey(e.key, false); });
window.addEventListener('resize', updatePortraitBlock);

window.openGameOverDialog = openGameOverDialog;
window.openGameWinDialog = openGameWinDialog;
window.isGamePaused = isGamePaused;
window.isGameMuted = isGameMuted;


