/**
 * @class World
 * @description Represents the game world, managing characters, enemies, items, and game state.
 */

class World {
    character;
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    maxCameraLeft = 0;
    statusHealthBar;
    statusBars = [];
    throwableObjects = [];
    isThrowing = false;
    currentBottle = null;
    coinsObjects = [];
    coinManager;
    statusBarManager;
    bottleManager;
    bottleObjects = [];
    currentCollectedBottles = 0;
    lastBounceTime = 0;
    pauseImg;
    isHit;

    /**
     * @description Constructs a World instance with specified parameters.
     * @memberOf World
     * @constructor
     * @param {HTMLCanvasElement} canvas 
     * @param {keyboard} keyboard 
     * @param {Level} level 
     * @param {string} colorTheme 
     */
    constructor(canvas, keyboard, level, colorTheme) {
        this.level = level;
        this.canvas = canvas;
        this.colorTheme = colorTheme;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
    }

    /**
     * @description Starts the game loop, updating game state and rendering at 60 FPS.
     * @memberOf World
     * @method run
     * @returns {void}
     */
    run() {
        window.createStoppableInterval(() => this.runInterval(), 1000 / 60);
        window.createStoppableInterval(() => this.safeGameInterval(), 2000);
        this.startBackgroundMusic();
    }

    /**
     * @description Updates the game state, including character movement, enemy interactions, and item management.
     * @memberOf World
     * @method runInterval
     * @returns {void}
     */
    runInterval(){
        this.character.applyGravity();
            this.level.enemies.forEach((enemy) => {
                this.checkColisions(enemy);
                this.checkColisionsWithThrowableObjects(enemy);
            });
            this.checkThrowableObjects();
            this.coinManager.update();
            this.bottleManager.update();
            this.checkIfNewBottleCollected();
            this.draw();
    }

    /**
     * @description Safely saves the game state at regular intervals.
     * @memberOf World
     * @method safeGameInterval
     * @returns {void}
     */
    safeGameInterval(){
        safeGameState(this)
    }

    /**
     * @description Starts the background music if the game is not muted.
     * @memberOf World
     * @method startBackgroundMusic
     * @returns {void}
     */
    startBackgroundMusic() {
        if (!window.isGameMuted() && !window.isGamePaused()) {
            window.audioManager.playBackgroundMusic();
        }
    }
    
    /**
     * @description Checks if a new bottle has been collected and updates the throwable objects accordingly.
     * @memberOf World
     * @method checkIfNewBottleCollected
     * @returns {void}
     */
    checkIfNewBottleCollected() {
        if (this.currentCollectedBottles < this.bottleManager.collectedItems) {

            for (let i = 0; i < this.bottleManager.collectedItems - this.currentCollectedBottles; i++) {
                const bottle = new ThrowableObject();
                bottle.canvas = this.canvas;
                this.throwableObjects.push(bottle);
            }
            this.currentCollectedBottles = this.bottleManager.collectedItems;
        }
    }

    /**
     * @description Creates new game objects including character, status bars, coins, and bottles.
     * @memberOf World
     * @method createNewGameObjects
     * @returns {void}
     */
    createNewGameObjects() {
        this.character = new Character(this);
        this.statusBarManager = new StatusbarManager(this.colorTheme, this.level.enemies);
        this.statusBarManager.createNewStatusBars();
        this.statusBars = this.statusBarManager.statusBars;
        this.coinManager = new ItemsManager(this.character, this.statusBars.find(sb => sb.barType === 'coins'), this.level, this.canvas);
        this.coinsObjects = this.coinManager.createNewItems((height, levelEndX) => new Coin(height, levelEndX), this.level.coinsOnScreen);
        this.bottleManager = new ItemsManager(this.character, this.statusBars.find(sb => sb.barType === 'bottles'), this.level, this.canvas);
        this.bottleObjects = this.bottleManager.createNewItems((height, levelEndX) => new Bottle(height, levelEndX), this.level.bottlesOnScreen);
        const endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss) {
            endboss.endBossStatusBar = this.statusBars.find(sb => sb.barType === 'endboss_health');
            endboss.world = this;
        }
    }

    /**
     * @description Creates game objects from a saved game state.
     * @memberOf World
     * @method createSavedGameObjects
     * @param {Object} savedState 
     * @returns {void}
     */
    createSavedGameObjects(savedState) {
        this.statusBarManager = new StatusbarManager(this.colorTheme, this.level.enemies);
        this.statusBarManager.createSavedStatusBars(savedState.statusbars);
        this.statusBars = this.statusBarManager.statusBars;
        this.coinManager = new ItemsManager(this.character, this.statusBars.find(sb => sb.barType === 'coins'), this.level, this.canvas);
        this.coinsObjects = this.coinManager.createSavedItems(savedState.coins, savedState.coins.coins, (height, levelEndX) => new Coin(height, levelEndX));
        this.bottleManager = new ItemsManager(this.character, this.statusBars.find(sb => sb.barType === 'bottles'), this.level, this.canvas);
        this.bottleObjects = this.bottleManager.createSavedItems(savedState.bottles, savedState.bottles.bottles, (height, levelEndX, bottleImageIndex) => new Bottle(height, levelEndX, bottleImageIndex));
        const endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss) {
            endboss.endBossStatusBar = this.statusBars.find(sb => sb.barType === 'endboss_health');
            endboss.world = this;
        }
        this.currentCollectedBottles = this.bottleManager.collectedItems;
        this.fillThrowableObjectsArray();
    }

    /**
     * @description Fills the throwable objects array based on the current collected bottles.
     * @memberOf World
     * @method fillThrowableObjectsArray
     * @returns {void}
     */
    fillThrowableObjectsArray(){
        this.throwableObjects = [];
        for (let i = 0; i < this.currentCollectedBottles; i++) {
            const bottle = new ThrowableObject();
            bottle.canvas = this.canvas;
            this.throwableObjects.push(bottle);
        }
    }

    /**
     * @description Checks for collisions between the character and an enemy, handling interactions accordingly.
     * @memberOf World
     * @method checkColisions
     * @param {Enemy} enemy 
     * @returns {void}
     */
    checkColisions(enemy) {
        if (enemy.isDead == true || enemy.energy <= 1) return;
        const colliding = this.character.isColliding(enemy);
        if (!colliding) return;
        const collidingTop = this.character.isCollidingTop(enemy) && !this.character.isDead && !enemy.isDead;
        if (collidingTop) {
            this.characterHitEnemyOnTop(enemy);
            return;
        }
        if (!this.character.isDead) {
            this.characterIsColliding(enemy);
        }
    }

    /**
     * @description Handles the event when the character is colliding with an enemy.
     * @memberOf World
     * @method characterIsColliding
     * @param {Enemy} enemy 
     * @returns {void}  
     */
    characterIsColliding(enemy) {

        if(window.isGamePaused()) return;

        if(!this.isHit){
            this.isHit = new Date().getTime();
            this.characterHit(enemy);
            return;
        }

        if( new Date().getTime() - this.isHit < 1500) return;
        this.isHit = new Date().getTime();
        this.characterHit(enemy);
    }

    /**
     * @description Handles the event when the character is hit by an enemy.
     * @memberOf World
     * @method characterHit
     * @param {Enemy} enemy 
     */
    characterHit(enemy) {
        this.character.hit();
        this.character.playHurtSound();
        const bar = this.statusBars.find(sb => sb.barType === 'health');
        bar.setPercentage(this.character.energy);
        if (enemy instanceof Endboss && !this.character.isDead) {
            const endboss = this.level.enemies.find(e => e instanceof Endboss);
            if (!endboss.isAttacking) {
                endboss.attack();
            }
        }
    }

    /**
     * @description Handles the event when the character hits an enemy on top.
     * @memberOf World
     * @method characterHitEnemyOnTop
     * @param {Enemy} enemy 
     * @returns {void}
     */
    characterHitEnemyOnTop(enemy) {
        if (enemy instanceof Endboss) { return; }
        if( enemy.energy <= 1) { return; }
        window.audioManager.playSoundEffect('./audio/chicken-shrines-01.mp3');
        enemy.hit();
        this.bounceOffEnemy(enemy);
    }

    /**
     * @description Makes the character bounce off an enemy after hitting it on top.
     * @memberOf World
     * @method bounceOffEnemy
     * @param {Enemy} enemy 
     * @returns {void}
     */
    bounceOffEnemy(enemy) {
        this.character.speedY = 20;
        this.character.pos_y = (enemy.pos_y + enemy.offset.top) - (this.character.height - this.character.offset.bottom) - 1;
    }

    /**
     * @description Checks for collisions between throwable objects and an enemy, handling interactions accordingly.
     * @memberOf World
     * @method checkColisionsWithThrowableObjects
     * @param {Enemy} enemy 
     * @returns {void}
     */
    checkColisionsWithThrowableObjects(enemy) {
        if (enemy.isDead) return;
        if (this.currentBottle == null) return;
        if (!this.currentBottle.isFlying) return;
        if (!this.currentBottle.isColliding(enemy, this.currentBottle.killbox, enemy.killbox)) return;

        this.currentBottle.isFlying = false;
        this.currentBottle.splashing();

        if (enemy instanceof Endboss) {
            enemy.entbossHit();
            window.audioManager.playSoundEffect('./audio/chicken-alarm.mp3');
        } else {
            enemy.hit();
            window.audioManager.playSoundEffect('./audio/chicken-shrines-01.mp3');
        }
    }

    /**
     * @description Checks if the character is throwing a bottle and handles the throwing action.
     * @memberOf World
     * @method checkThrowableObjects
     * @returns {void}
     */
    checkThrowableObjects() {
        if (this.keyboard.throwing && !this.isThrowing && !this.character.isHurt) {
            if (this.throwableObjects.length <= 0) return;
            this.isThrowing = true;
            let bottle = this.throwableObjects.pop();
            this.currentBottle = bottle;

            this.bottleManager.collectedItems--;
            this.bottleManager.setStatusBarPercentage();
            this.currentCollectedBottles = this.bottleManager.collectedItems;

            const pos_x = this.character.otherDirection ? this.character.pos_x - this.character.offset.right + 40 : this.character.pos_x + 70;
            const pos_y = this.character.pos_y + 150;
            bottle.fling(pos_x, pos_y, this.character.otherDirection);
        }

        if (this.keyboard.allKeysReleased) {
            this.isThrowing = false;
        }
    }

    /**
     * @description Draws the game world, including background, characters, enemies, items, and status bars.
     * @memberOf World
     * @method draw
     * @returns {void}
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.drawEnemies();
        this.drawBottle();
        this.drawCoins();
        this.drawBottles();
        this.drawEndbossHealthBar();
        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars(this.statusBars);
        if (window.isGamePaused()) {
            this.drawPauseScreen();
        }
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * @description Draws the pause screen overlay.
     * @memberOf World
     * @method drawPauseScreen
     * @returns {void}
     */
    drawPauseScreen() {
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = `${this.canvas.width * 0.12}px Lilita-One`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.shadowColor = 'rgba(0,0,0,0.9)';
        this.ctx.shadowBlur = 8;
        this.ctx.fillText('PAUSE', this.canvas.width / 2, this.canvas.height / 2);

        this.ctx.restore();
    }

    /**
     * @description Draws all enemies in the level.
     * @memberOf World
     * @method drawEnemies
     * @returns {void}
     */
    drawEnemies() {
        this.level.enemies.forEach(enemy => {
            if (!enemy.isDead) {
                this.addToMap(enemy);
            }
        });
    }

    /**
     * @description Draws the currently thrown bottle if it exists and is not splashed.
     * @memberOf World
     * @method drawBottle
     * @returns {void}
     */
    drawBottle() {
        if (this.currentBottle && !this.currentBottle.isSplashed) {
            this.addToMap(this.currentBottle);
        } else {
            this.currentBottle = null;
        }
    }

    /**
     * @description Draws all uncollected and on-screen bottles.
     * @memberOf World
     * @method drawBottles
     * @returns {void}
     */
    drawBottles() {
        this.bottleObjects.forEach(bottle => {
            if (!bottle.isCollected && !bottle.isOutOfScreen) {
                this.addToMap(bottle);
            }
        });
    }

    /**
     * @description Draws all uncollected and on-screen coins.
     * @memberOf World
     * @method drawCoins
     * @returns {void}
     */
    drawCoins() {
        this.coinsObjects.forEach(coin => {
            if (!coin.isCollected && !coin.isOutOfScreen) {
                this.addToMap(coin);
            }
        });
    }

    /**
     * @description Draws the status bars on the screen, excluding the endboss health bar.
     * @memberOf World
     * @method drawStatusBars
     * @returns {void}
     */
    drawStatusBars() {
        this.statusBars.forEach(statusBar => {
            if (statusBar.barType === 'endboss_health') {
                return;
            }
            this.addToMap(statusBar);
        });
    }

    /**
     * @description Draws the endboss health bar if it exists.
     * @memberOf World
     * @method drawEndbossHealthBar
     * @returns {void}
     */
    drawEndbossHealthBar() {
        const endbossHealthBar = this.statusBars.find(sb => sb.barType === 'endboss_health');
        if (endbossHealthBar) {
            this.addToMap(endbossHealthBar);
        }
    }

    /**
     * @description Adds a movable object to the map, handling direction and drawing.
     * @param {MoveableObject} mo 
     * @memberOf World
     * @method addToMap
     * @returns {void}
     */
    addToMap(mo) {

        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack();
        }
    }

    /**
     * @description Flips the image of a movable object for drawing in the opposite direction.
     * @memberOf World
     * @method flipImage
     * @param {MoveableObject} mo 
     * @returns {void}
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.pos_x + mo.width, 0);
        this.ctx.scale(-1, 1);
        this.ctx.translate(-mo.pos_x, 0);
    }

    /**
     * @description Restores the image context after flipping.
     * @memberOf World
     * @method flipImageBack
     * @returns {void}
     */
    flipImageBack() {
        this.ctx.restore();
    }

    /**
     * @description Adds multiple movable objects to the map.
     * @memberOf World
     * @method addObjectsToMap
     * @param {Array<MoveableObject>} objects 
     * @returns {void}
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * @description Handles the game over sequence, stopping the game and displaying the game over dialog.
     * @memberOf World
     * @method gameOver
     * @returns {void}
     */
    gameOver() {
        setTimeout(() => {
            this.stopGame();
            window.openGameOverDialog();
            window.audioManager.playSoundEffect('./audio/game-over.mp3');
            return;
        }, 100);
    }

    /**
     * @description Checks the win condition by verifying if the endboss is dead and handles the win sequence.
     * @memberOf World
     * @method checkWinCondition
     * @returns {void}
     */
    checkWinCondition() {
        const endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss && endboss.isDead) {
            setTimeout(() => {
                this.stopGame();
                window.openGameWinDialog();
                window.audioManager.playSoundEffect('./audio/orchestral-win.mp3');
                return;
            }, 100);
        }

    }

    /**
     * @description Stops the game loop and audio.
     * @memberOf World
     * @method stopGame
     * @returns {void}
     */
    stopGame(){
        window.clearAllGameIntervals();
        safeIsGameEnded(true);
        window.audioManager.stopBackgroundMusic();
    }

}