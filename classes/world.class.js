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
    runInterval;
    pauseImg;
    audioManager = new AudioManager();
    isHit;

    constructor(canvas, keyboard, level, colorTheme, audioManager) {
        this.level = level;
        this.canvas = canvas;
        this.colorTheme = colorTheme;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.audioManager = audioManager;
    }


    run() {

        this.runInterval = setInterval(() => {

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

        }, 1000 / 60);

        setInterval(() => {
            safeGameState(this)
        }, 2000);

        this.startBackgroundMusic();
    }


    startBackgroundMusic() {
        if (!window.isGameMuted()) {
            this.audioManager.playBackgroundMusic();
        }
    }
    

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

    createNewGameObjects() {
        this.character = new Character(this);
        this.statusBarManager = new StatusbarManager(this.colorTheme, this.level.enemies);
        this.statusBarManager.createNewStatusBars();
        this.statusBars = this.statusBarManager.statusBars;
        this.coinManager = new ItemsManager(this.character, this.statusBars.find(sb => sb.barType === 'coins'), this.level, this.canvas, this.audioManager);
        this.coinsObjects = this.coinManager.createNewItems((height, levelEndX) => new Coin(height, levelEndX), this.level.coinsOnScreen);
        this.bottleManager = new ItemsManager(this.character, this.statusBars.find(sb => sb.barType === 'bottles'), this.level, this.canvas, this.audioManager);
        this.bottleObjects = this.bottleManager.createNewItems((height, levelEndX) => new Bottle(height, levelEndX), this.level.bottlesOnScreen);
        const endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss) {
            endboss.endBossStatusBar = this.statusBars.find(sb => sb.barType === 'endboss_health');
            endboss.world = this;
        }
    }

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
    }

    checkColisions(enemy) {

        if (enemy.isDead == true) return;

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


    characterIsColliding(enemy) {
        if(!this.isHit){
            this.isHit = new Date().getTime();
            this.characterHit(enemy);
            return;
        }

        if( new Date().getTime() - this.isHit < 1500) return;
        this.isHit = new Date().getTime();
        this.characterHit(enemy);
    }


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

    characterHitEnemyOnTop(enemy) {
        if (enemy instanceof Endboss) { return; }
        enemy.damage = 100;
        this.audioManager.playSoundEffect('../audio/chicken-shrines-01.mp3');
        enemy.hit();
        this.bounceOffEnemy(enemy);
    }

    bounceOffEnemy(enemy) {
        this.character.speedY = 20;
        this.character.pos_y = (enemy.pos_y + enemy.offset.top) - (this.character.height - this.character.offset.bottom) - 1;
    }

    checkColisionsWithThrowableObjects(enemy) {
        if (enemy.isDead) return;
        if (this.currentBottle == null) return;
        if (!this.currentBottle.isFlying) return;
        if (!this.currentBottle.isColliding(enemy, this.currentBottle.killbox, enemy.killbox)) return;

        this.currentBottle.isFlying = false;
        this.currentBottle.splashing();

        if (enemy instanceof Endboss) {
            enemy.entbossHit();
            this.audioManager.playSoundEffect('../audio/chicken-alarm.mp3');
        } else {
            enemy.hit();
            this.audioManager.playSoundEffect('../audio/chicken-shrines-01.mp3');
        }
    }


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

    drawEnemies() {
        this.level.enemies.forEach(enemy => {
            if (!enemy.isDead) {
                this.addToMap(enemy);
            }
        });
    }

    drawBottle() {
        if (this.currentBottle && !this.currentBottle.isSplashed) {
            this.addToMap(this.currentBottle);
        } else {
            this.currentBottle = null;
        }
    }

    drawBottles() {
        this.bottleObjects.forEach(bottle => {
            if (!bottle.isCollected && !bottle.isOutOfScreen) {
                this.addToMap(bottle);
            }
        });
    }

    drawCoins() {
        this.coinsObjects.forEach(coin => {
            if (!coin.isCollected && !coin.isOutOfScreen) {
                this.addToMap(coin);
            }
        });
    }

    drawStatusBars() {
        this.statusBars.forEach(statusBar => {
            if (statusBar.barType === 'endboss_health') {
                return;
            }
            this.addToMap(statusBar);
        });
    }

    drawEndbossHealthBar() {
        const endbossHealthBar = this.statusBars.find(sb => sb.barType === 'endboss_health');
        if (endbossHealthBar) {
            this.addToMap(endbossHealthBar);
        }
    }

    addToMap(mo) {

        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack();
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.pos_x + mo.width, 0);
        this.ctx.scale(-1, 1);
        this.ctx.translate(-mo.pos_x, 0);
    }

    flipImageBack() {
        this.ctx.restore();
    }


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    gameOver() {
        setTimeout(() => {
            this.stopGame();
            window.openGameOverDialog();
            this.audioManager.playSoundEffect('../audio/game-over.mp3');
            return;
        }, 100);
    }

    checkWinCondition() {
        const endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss && endboss.isDead) {
            setTimeout(() => {
                this.stopGame();
                window.openGameWinDialog();
                this.audioManager.playSoundEffect('../audio/orchestral-win.mp3');
                return;
            }, 100);
        }

    }

    stopGame(){
        clearInterval(this.runInterval);
        this.runInterval = null;
        safeIsGameEnded(true);
        this.stopAudio();
    }

    stopAudio() {
        this.audioManager.stopBackgroundMusic();
    }



}