function safeGameRunningState(running) {
    localStorage.setItem('gameRunning', JSON.stringify(running));
    if (!running) {
        clearGameState();
    }
}

function loadGameRunningState() {
    const running = localStorage.getItem('gameRunning');
    return JSON.parse(running);
}

function safeGameState(state) {
    safeCharacterState(state.character);
    safeCoinState(world.coinsObjects, world.coinManager);
    safeBottleState(world.bottleObjects, world.bottleManager);
    safeEnemyState(state.level.enemies);
}

function loadGameState() {
    const state = localStorage.getItem('gameState');
    return JSON.parse(state);
}

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

function loadCharacterState() {
    const character = localStorage.getItem('characterState');
    return JSON.parse(character);
}


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

function loadCoinState() {
    const coins = localStorage.getItem('coinsState');
    return JSON.parse(coins);
}


function safeBottleState(bottles, bottleManager) {
    const state = {
        collectedItems: bottleManager.collectedItems,
        totalItems: bottleManager.totalItems,
        bottles: bottles.map(bottle => ({
            isCollected: bottle.isCollected,
            pos_x: bottle.pos_x,
            pos_y: bottle.pos_y,
            out: bottle.isOutOfScreen
        }))
    };

    localStorage.setItem('bottlesState', JSON.stringify(state));
}

function loadBottleState() {
    const bottles = localStorage.getItem('bottlesState');
    return JSON.parse(bottles);
}

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

function loadEnemyState() {
    const enemies = localStorage.getItem('enemiesState');
    return JSON.parse(enemies);
}
function clearGameState() {
    localStorage.removeItem('characterState');
    localStorage.removeItem('coinsState');
    localStorage.removeItem('bottlesState');
    localStorage.removeItem('enemiesState');
}