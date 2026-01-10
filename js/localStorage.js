/**
 * @description Functions to save and load game state and settings using localStorage.
 * @namespace LocalStorage
 * @file js/localStorage.js
 */

/**
 * @description Saves the running state of the game.
 * @memberOf LocalStorage
 * @function safeGameRunningState
 * @param {boolean} running 
 * @returns {void}
 */
function safeGameRunningState(running) {
    localStorage.setItem('gameRunning', JSON.stringify(running));
    if (!running) {
        clearGameState();
    }
}

/**
 * @description Loads the running state of the game.
 * @memberOf LocalStorage
 * @function loadGameRunningState
 * @returns {boolean}
 */
function loadGameRunningState() {
    const running = localStorage.getItem('gameRunning');
    return JSON.parse(running);
}

/**
 * @description Saves the entire game state including character, coins, bottles, enemies, and status bars.
 * @memberOf LocalStorage
 * @function safeGameState
 * @param {Object} state 
 * @returns {void}
 */
function safeGameState(state) {
    safeCharacterState(state.character);
    safeCoinState(world.coinsObjects, world.coinManager);
    safeBottleState(world.bottleObjects, world.bottleManager);
    safeEnemyState(state.level.enemies);
    safeStatusbarState(state.statusBars);
}

/**
 * @description Loads the entire game state including character, coins, bottles, enemies, and status bars.
 * @memberOf LocalStorage
 * @function loadGameState
 * @returns {Object}
 */
function loadGameState() {
    const state = localStorage.getItem('gameState');
    return JSON.parse(state);
}

/**
 * @description Saves the character's state including position and health.
 * @memberOf LocalStorage
 * @function safeCharacterState
 * @param {Character} character
 * @returns {void} 
 */
function safeCharacterState(character) {

    const state = {
        character: {
            x: character.pos_x,
            y: character.pos_y,
            health: character.energy,
        }
    };

    localStorage.setItem('characterState', JSON.stringify(state));
}

/**
 * @description Loads the character's state including position and health.
 * @memberOf LocalStorage
 * @function loadCharacterState
 * @returns {Character}
 */
function loadCharacterState() {
    const character = localStorage.getItem('characterState');
    return JSON.parse(character);
}

/**
 * @description Saves the state of coins in the game.
 * @memberOf LocalStorage
 * @function safeCoinState
 * @param {Array<Coins>} coins 
 * @param {ItemsManager} coinManager 
 * @returns {void}
 */
function safeCoinState(coins, coinManager) {
    const state = {
        collectedItems: coinManager.collectedItems,
        totalItems: coinManager.totalItems,
        coins: coins.map(coin => ({
            isCollected: coin.isCollected,
            pos_x: coin.pos_x,
            pos_y: coin.pos_y,
            out: coin.isOutOfScreen
        }))
    };

    localStorage.setItem('coinsState', JSON.stringify(state));
}

/**
 * @description Loads the state of coins in the game.
 * @memberOf LocalStorage
 * @function loadCoinState
 * @returns {Array<Coins>}
 */
function loadCoinState() {
    const coins = localStorage.getItem('coinsState');
    return JSON.parse(coins);
}

/**
 * @description Saves the state of bottles in the game.
 * @memberOf LocalStorage
 * @function safeBottleState
 * @param {Array<Bottle>} bottles 
 * @param {ItemsManager} bottleManager 
 * @returns {void}
 */
function safeBottleState(bottles, bottleManager) {
    const state = {
        collectedItems: bottleManager.collectedItems,
        totalItems: bottleManager.totalItems,
        bottles: bottles.map(bottle => ({
            isCollected: bottle.isCollected,
            pos_x: bottle.pos_x,
            pos_y: bottle.pos_y,
            out: bottle.isOutOfScreen,
            bottleImageIndex: bottle.bottleImageIndex
        }))
    };

    localStorage.setItem('bottlesState', JSON.stringify(state));
}

/**
 * @description Loads the state of bottles in the game.
 * @memberOf LocalStorage
 * @function loadBottleState
 * @returns {Array<Bottle>}
 */
function loadBottleState() {
    const bottles = localStorage.getItem('bottlesState');
    return JSON.parse(bottles);
}

/**
 * @description Saves the state of enemies in the game.
 * @memberOf LocalStorage
 * @function safeEnemyState
 * @param {Array<Enemy>} enemies 
 * @returns {void}
 */
function safeEnemyState(enemies) {
    const state = {
        enemies: enemies.map(enemy => ({
            isDied: enemy.isDied,
            pos_x: enemy.pos_x,
            pos_y: enemy.pos_y,
            energy: enemy.energy,
            isChicken: enemy instanceof Chicken,
            isEndboss: enemy instanceof Endboss
        }))
    };

    localStorage.setItem('enemiesState', JSON.stringify(state));
}

/**
 * @description Loads the state of enemies in the game.
 * @memberOf LocalStorage
 * @function loadEnemyState
 * @returns {Array<Enemy>}
 */
function loadEnemiesState() {
    const enemies = localStorage.getItem('enemiesState');
    return JSON.parse(enemies);
}

/**
 * @description Saves the state of clouds in the game.
 * @memberOf LocalStorage
 * @function safeCloudState
 * @param {Array<Cloud>} clouds
 * @returns {void} 
 */
function safeCloudState(clouds) {
    const state = {
        clouds: clouds.map(cloud => ({
            pos_x: cloud.pos_x,
            pos_y: cloud.pos_y
        }))
    };
    localStorage.setItem('cloudsState', JSON.stringify(state));
}

/**
 * @description Loads the state of clouds in the game.
 * @memberOf LocalStorage
 * @function loadCloudsState
 * @returns {Array<Cloud>}
 */
function loadCloudsState() {
    const clouds = localStorage.getItem('cloudsState');
    return JSON.parse(clouds);
}

/**
 * @description Saves the level state in the game.
 * @memberOf LocalStorage
 * @function safeLevelState
 * @param {Object} levelState 
 * @returns {void}
 */
function safeLevelState(levelState) {
    localStorage.setItem('levelState', JSON.stringify(levelState));
}

/**
 * @description Loads the level state in the game.
 * @memberOf LocalStorage
 * @function loadLevelState
 * @returns {Object}
 */
function loadLevelState() {
    const levelState = localStorage.getItem('levelState');
    return JSON.parse(levelState);
}

/**
 * @description Saves the status bar states in the game.
 * @memberOf LocalStorage
 * @function safeStatusbarState
 * @param {Array<StatusBar>} statusBars 
 * @returns {void}
 */
function safeStatusbarState(statusBars) {
    const state = {
        statusBars: statusBars.map(bar => ({
            type: bar.barType,
            value: bar.percentage,
            color: bar.color,
            x: bar.pos_x,
            y: bar.pos_y
        }))
    }


    localStorage.setItem('statusBarState', JSON.stringify(state));
}

/**
 * @description Loads the status bar states in the game.
 * @memberOf LocalStorage
 * @function loadStatusbarState
 * @returns {Array<StatusBar>}
 */
function loadStatusbarState() {
    const statusbarState = localStorage.getItem('statusBarState');
    return JSON.parse(statusbarState);
}

/**
 * @description Saves the pause state of the game.
 * @memberOf LocalStorage
 * @function safePauseState
 * @param {boolean} isPaused 
 * @returns {void}
 */
function safePauseState(isPaused) {
    localStorage.setItem('isGamePaused', JSON.stringify(isPaused));
}

/**
 * @description Loads the pause state of the game.
 * @memberOf LocalStorage
 * @function loadPauseState
 * @returns {boolean}
 */
function loadPauseState() {
    const isPaused = localStorage.getItem('isGamePaused');
    return JSON.parse(isPaused);
}

/**
 * @description Saves the ended state of the game.
 * @memberOf LocalStorage
 * @function safeIsGameEnded
 * @param {boolean} isEnded 
 * @returns {void}
 */
function safeIsGameEnded(isEnded) {
    localStorage.setItem('isGameEnded', JSON.stringify(isEnded));
}

/**
 * @description Loads the ended state of the game.
 * @memberOf LocalStorage
 * @function loadIsGameEnded
 * @returns {boolean}
 */
function loadIsGameEnded() {
    const isEnded = localStorage.getItem('isGameEnded');
    return JSON.parse(isEnded);
}

/**
 * @description Clears the saved game state from localStorage.
 * @memberOf LocalStorage
 * @function clearGameState
 * @returns {void}
 */
function clearGameState() {
    localStorage.removeItem('characterState');
    localStorage.removeItem('coinsState');
    localStorage.removeItem('bottlesState');
    localStorage.removeItem('enemiesState');
    localStorage.removeItem('cloudsState');
    localStorage.removeItem('statusBarState');
    localStorage.removeItem('levelState');
    localStorage.setItem('gameRunning', JSON.stringify(false));
    localStorage.setItem('isGamePaused', JSON.stringify(false));
    localStorage.setItem('isGameEnded', JSON.stringify(false));
}

/**
 * @description Saves the game settings.
 * @memberOf LocalStorage
 * @function safeGameSettings
 * @param {Object} settings 
 * @returns {void}
 */
function safeGameSettings(settings) {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
}

/**
 * @description Loads the game settings.
 * @memberOf LocalStorage
 * @function loadGameSettings
 * @returns {Object}
 */
function loadGameSettings() {
    const settings = localStorage.getItem('gameSettings');
    return JSON.parse(settings);
}