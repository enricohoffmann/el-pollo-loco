/**
 * @description Main game logic and initialization.
 * @namespace Game
 * @file js/game.js
 */

let keyboard;
let canvas;
let ctx;
let world;
let canvasWidth = 720;
let canvasHeight = 480;
let isPause = false;
let muted = false;
let isFullScreen = false;
let gameSettings;
let isControlBind = false;
let audioManager = new AudioManager();
let gameIsEnded = false;
let gameInterval = [];
let gameVolume = 5


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
    },
    volumeMinus: {
        buttonId: 'volumeMinusButton',
        action: audioVolumeDown
    },
    volumePlus: {
        buttonId: 'volumePlusButton',
        action: audioVolumeUp
    }
}

const defaultGameSettings = {
    audioSetting: "Audio On",
    countOfEnemies: 3,
    countOfMinBottles: 6,
    countOfMinCoins: 5,
    difficulty: "Easy",
    gameLengthFrames: 3,
    theme: "Blue",
    volume: 5,
    forMutingVolume: 5
}

/**
 * @description Initializes the game by loading assets and starting a new or saved game.
 * @memberOf Game
 * @function init
 * @returns {void}
 */
function init() {
    gameIsEnded = loadIsGameEnded() || false;
    if (gameIsEnded) {
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

/**
 * @description Loads initial game assets and settings.
 * @memberOf Game
 * @function loadInitialAssets
 * @returns {void}
 */
function loadInitialAssets() {
    keyboard = new Keyboard();
    isPause = loadPauseState();
    handleGameSettings();
    togglePauseButtonIcon();
    audioSettingsInit();
    updateAudioVolume();
    bindVolumeSlider();
    initSlider();
    updateDifficultyState();
    bindControls();
    loadAudio();
}

/**
 * @description Handles loading or initializing game settings.
 * @memberOf Game
 * @function handleGameSettings
 * @returns {void}
 */
function handleGameSettings() {
    gameSettings = loadGameSettings();
    if (!gameSettings) {
        gameSettings = defaultGameSettings;
        safeGameSettings(gameSettings);
    }
}

/**
 * @description Binds control buttons to their respective actions.
 * @memberOf Game
 * @function bindControls
 * @returns {void}
 */
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

/**
 * @description Binds the volume slider to update the game volume.
 * @memberOf Game
 * @function bindVolumeSlider
 * @returns {void}
 */
function bindVolumeSlider() {
    const volumeSlider = document.getElementById('setVolume');
    volumeSlider.addEventListener('input', (e) => {
        const volumeValue = Math.round(parseInt(e.target.value, 10) / 10);
        gameVolume = volumeValue;
        updateAudioVolume();
        updateSliderBackground(volumeSlider);
    });
}

/**
 * @description Initializes the volume slider's background style.
 * @memberOf Game
 * @function initSlider
 * @returns {void}
 */
function initSlider() {
    const volumeSlider = document.getElementById('setVolume');
    updateSliderBackground(volumeSlider);
}

/**
 * @description Updates the background style of a slider element based on its value.
 * @memberOf Game
 * @function updateSliderBackground
 * @param {HTMLElement} slider 
 */
function updateSliderBackground(slider) {
    const min = slider.min || 0;
    const max = slider.max || 100;
    const val = slider.value;

    const percentage = ((val - min) * 100) / (max - min);

    slider.style.background = `
        linear-gradient(
            to right,
            var(--button-yellow) ${percentage}%,
            #ffffff ${percentage}%
        )
    `;
}


/**
 * @description Initializes audio settings based on saved game settings.
 * @memberOf Game
 * @function audioSettingsInit
 * @returns {void}
 */
function audioSettingsInit() {
    if (gameSettings) {
        muted = gameSettings.audioSetting === 'Audio Off' ? true : false;
        gameVolume = muted ? 0 : gameSettings.volume;
    }
    audioManager.toggleMusic(!muted);
    audioManager.setVolume(gameVolume);
    audioManager.toggleSFX(!muted);
    toggleMuteButtonIcon();
    updateAudioVolume();

}

/**
 * @description Loads audio assets for the game.
 * @memberOf Game
 * @function loadAudio
 * @returns {void}
 */
function loadAudio() {
    audioManager.loadBackgroundMusic('./audio/retro-game-402454.mp3');
}

/**
 * @description Increases the game audio volume by 1, up to a maximum of 10.
 * @memberOf Game
 * @function audioVolumeUp
 * @returns {void}
 */
function audioVolumeUp() {
    if (gameVolume < 10) {
        gameVolume += 1;
        updateAudioVolume();
    }
}

/**
 * @description Decreases the game audio volume by 1, down to a minimum of 0.
 * @memberOf Game
 * @function audioVolumeDown
 * @returns {void}
 */
function audioVolumeDown() {
    if (gameVolume > 0) {
        gameVolume -= 1;
        updateAudioVolume();
    }
}

/**
 * @description Updates the game audio volume and related settings.
 * @memberOf Game
 * @function updateAudioVolume
 * @returns {void}
 */
function updateAudioVolume() {
    document.getElementById('setVolume').value = gameVolume * 10;
    audioManager.setVolume(gameVolume);
    gameSettings.volume = gameVolume;
    updateAudioGameSettings();
    initSlider();
    if (muted && gameVolume > 0) {
        muted = false;
        audioManager.toggleMusic(true);
        if (isPause) { audioManager.pauseBackgroundMusic(); }
        audioManager.toggleSFX(true);
        toggleMuteButtonIcon();
    } else if (gameVolume === 0) {
        muted = true;
        audioManager.toggleMusic(false);
        audioManager.toggleSFX(false);
        toggleMuteButtonIcon();
    }
}


function updateAudioGameSettings() {
    if (gameSettings) {
        gameSettings.volume = gameVolume;
        gameSettings.audioSetting = muted ? 'Audio Off' : 'Audio On';
        safeGameSettings(gameSettings);
    }
}


/**
 * @description Updates the displayed difficulty state in the game UI.
 * @memberOf Game
 * @function updateDifficultyState
 * @returns {void}
 */
function updateDifficultyState() {
    const difficultyStateElement = document.getElementById('difficultyState');
    if (difficultyStateElement && gameSettings) {
        difficultyStateElement.textContent = `difficulty: ${gameSettings.difficulty}`;
    }
}

/**
 * @description Starts a new game with default settings.
 * @memberOf Game
 * @function newGameStart
 * @returns {void}
 */
function newGameStart() {
    safeGameRunningState(true);
    const levelCreator = new LevelCreator(canvas);
    const level = levelCreator.createLevel();
    const config = levelCreator.getCurrentGameSettings;
    world = new World(canvas, keyboard, level, config.theme.toLowerCase(), audioManager);
    world.createNewGameObjects();
    world.run();
}

/**
 * @description Starts a saved game by loading the previous state.
 * @memberOf Game
 * @function savedGameStart
 * @returns {void}
 */
function savedGameStart() {
    safeGameRunningState(true);
    const levelCreator = new LevelCreator(canvas);
    const level = levelCreator.createLevelFromState();
    const config = levelCreator.getCurrentGameSettings;
    world = new World(canvas, keyboard, level, config.theme.toLowerCase(), audioManager);
    world.character = new Character(world);
    world.character.pos_x = loadCharacterState().character.x;
    world.character.pos_y = loadCharacterState().character.y;
    world.character.energy = loadCharacterState().character.health;
    world.createSavedGameObjects(getSavedGameObjects());
    world.run();
}


/**
 * @description Retrieves saved game objects from local storage.
 * @memberOf Game
 * @function getSavedGameObjects
 * @returns {Object} The saved game objects including status bars, coins, and bottles.
 */
function getSavedGameObjects() {
    const gameObjects = {
        statusbars: loadStatusbarState(),
        coins: loadCoinState(),
        bottles: loadBottleState(),
    }

    return gameObjects;
}

/**
 * @description Opens the game over dialog and locks the screen size.
 * @memberOf Game
 * @function openGameOverDialog
 * @returns {void}
 */
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

/**
 * @description Closes the game over dialog and resets the game state.
 * @memberOf Game
 * @function closeGameOverDialog
 * @returns {void}
 */
function closeGameOverDialog() {
    const dialog = document.getElementById('game-over-dialog');
    dialog.close();
    safeGameRunningState(false);
    world = null;
    unlockResize();
    navigateTo('index');
}

/**
 * @description Opens the game win dialog and locks the screen size.
 * @memberOf Game
 * @function openGameWinDialog
 * @returns {void}
 */
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

/**
 * @description Closes the game win dialog and resets the game state.
 * @memberOf Game
 * @function closeGameWinDialog
 * @returns {void}
 */
function closeGameWinDialog() {
    const dialog = document.getElementById('game-win-dialog');
    dialog.close();
    safeGameRunningState(false);
    world = null;
    unlockResize();
    navigateTo('index');
}

/**
 * @description Locks the screen size to prevent resizing.
 * @memberOf Game
 * @function lockResize
 * @returns {void}
 */
function lockResize() {
    document.body.classList.add('lock-resize');
}

/**
 * @description Unlocks the screen size to allow resizing.
 * @memberOf Game
 * @function unlockResize
 * @returns {void}
 */
function unlockResize() {
    document.body.classList.remove('lock-resize');
}

/**
 * @description Handles navigation button clicks during the game, pausing the game before navigation.
 * @memberOf Game
 * @function navigationButtonOnGame
 * @param {string} target 
 */
function navigationButtonOnGame(target) {
    isPause = true;
    togglePauseButtonIcon();
    safeGameState(world);
    safePauseState(isPause);
    world.audioManager.pauseBackgroundMusic();
    navigateTo(target);
}

/**
 * @description Toggles the game's pause state and updates the UI accordingly.
 * @memberOf Game
 * @function pauseGame
 * @returns {void}
 */
function pauseGame() {
    isPause = !isPause;
    togglePauseButtonIcon();
    safePauseState(isPause);

    if(isPause){
        world.audioManager.pauseBackgroundMusic()
    }else if(!isPause && !muted && !audioManager.isMusicPlaying){
        world.audioManager.playBackgroundMusic()
    }
}

/**
 * @description Checks if the game is currently paused.
 * @memberOf Game
 * @function isGamePaused
 * @returns {boolean} True if the game is paused, false otherwise.
 */
function isGamePaused() {
    return isPause;
}

/**
 * @description Toggles the pause button icon based on the game's pause state.
 * @memberOf Game
 * @function togglePauseButtonIcon
 * @returns {void}
 */
function togglePauseButtonIcon() {
    const pauseButtonDiv = document.querySelector('#pauseButton div');
    if (!isPause) {
        pauseButtonDiv.classList.remove('icon-pause');
        pauseButtonDiv.classList.add('icon-play');
    } else {
        pauseButtonDiv.classList.remove('icon-play');
        pauseButtonDiv.classList.add('icon-pause');
    }
}

/**
 * @description Reloads the game by clearing the current state and re-initializing.
 * @memberOf Game
 * @function reloadGame
 * @returns {void}
 */
function reloadGame() {

    if (isGamePaused()) { return; }

    if (world) {
        clearAllGameIntervals();
        world.audioManager.stopBackgroundMusic();
        audioManager = null;
        audioManager = new AudioManager();
        world = null;
        clearGameState();
        init();
    }

}

/**
 * @description Toggles the game's mute state and updates the UI and audio accordingly.
 * @memberOf Game
 * @function toggleMute
 * @returns {void}
 */
function toggleMute() {
    muted = !muted;
    gameSettings.audioSetting = muted ? 'Audio Off' : 'Audio On';
    gameSettings.forMutingVolume = muted ? gameVolume : gameSettings.forMutingVolume;
    if (muted) {
        forMutingVolume = gameVolume;
        gameVolume = 0;
    }else {
        gameVolume = gameSettings.forMutingVolume || 5;
    }
    safeGameSettings(gameSettings);
    toggleMuteButtonIcon();
    audioManager.toggleMusic(!muted);
    if(isPause) { audioManager.pauseBackgroundMusic(); }
    audioManager.toggleSFX(!muted);
    updateAudioVolume();
    
}

/**
 * @description Toggles the mute button icon based on the game's mute state.
 * @memberOf Game
 * @function toggleMuteButtonIcon
 * @returns {void}
 */
function toggleMuteButtonIcon() {
    const muteButtonDiv = document.querySelector('#muteButton div');
    if (muted) {
        muteButtonDiv.classList.remove('icon-audio-on');
        muteButtonDiv.classList.add('icon-audio-off');
    } else {
        muteButtonDiv.classList.remove('icon-audio-off');
        muteButtonDiv.classList.add('icon-audio-on');
    }

}

/**
 * @description Checks if the game is currently muted.
 * @memberOf Game
 * @function isGameMuted
 * @returns {boolean}
 */
function isGameMuted() {
    return muted;
}

/**
 * @description Toggles the game's full-screen mode and updates the UI accordingly.
 * @memberOf Game
 * @function toggleFullScreen
 * @returns {void}
 */
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

/**
 * @description Opens the specified element in full-screen mode.
 * @memberOf Game
 * @function openFullscreen
 * @param {HTMLElement} element 
 */
function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

/**
 * @description Closes full-screen mode.
 * @memberOf Game
 * @function closeFullscreen
 * @returns {void}
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * @description Toggles the full-screen button icon based on the full-screen state.
 * @memberOf Game
 * @function toggleFullScreenButtonIcon
 * @param {boolean} isFullScreen 
 */
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

/**
 * @description Creates a stoppable interval and stores its ID for later clearing.
 * @memberOf Game
 * @function createStoppableInterval
 * @param {Function} func 
 * @param {number} delay 
 * @returns {number} The interval ID that can be used to clear the interval later.
 */
function createStoppableInterval(func, delay) {
    let intervalId = setInterval(func, delay);
    gameInterval.push(intervalId);
    return intervalId;
}

/**
 * @description Clears all intervals created during the game.
 * @memberOf Game
 * @function clearAllGameIntervals
 * @return {void}
 */
function clearAllGameIntervals() {
    gameInterval.forEach((id) => {
        clearInterval(id);
    });
    gameInterval = [];
}

/**
 * @description Removes a specific interval ID from the tracking array.
 * @memberOf Game
 * @function removeOneGameInterval
 * @param {number} id 
 * @return {void}
 */
function removeOneGameInterval(id) {
    clearInterval(id);
    gameInterval = gameInterval.filter((intervalId) => intervalId !== id);
}

/**
 *@description Sets up event listeners for keyboard input and window resize events. Make varialbles and functions globally accessible.
 *@memberOf Game
 *@function setupEventListeners
 */
window.addEventListener("keydown", (e) => { keyboard.setKey(e.key, true); });
window.addEventListener("keyup", (e) => { keyboard.setKey(e.key, false); });
window.addEventListener('resize', updatePortraitBlock);

window.openGameOverDialog = openGameOverDialog;
window.openGameWinDialog = openGameWinDialog;
window.isGamePaused = isGamePaused;
window.isGameMuted = isGameMuted;
window.createStoppableInterval = createStoppableInterval;
window.clearAllGameIntervals = clearAllGameIntervals;
window.removeOneGameInterval = removeOneGameInterval;
window.defaultGameSettings = defaultGameSettings;


