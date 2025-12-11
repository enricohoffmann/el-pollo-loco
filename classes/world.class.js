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
    collectedCoins = 0;
    coinManager

    constructor(canvas, keyboard, level, colorTheme) {
        this.level = level;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.createStatusBars(colorTheme);
        this.creategameObjects();

        

        this.createThrowableObjectsOfStartGame();
        this.draw();
        this.run();
    }


    run() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                this.checkColisions(enemy);
                this.checkColisionsWithThrowableObjects(enemy);
            });
            this.checkThrowableObjects();
            this.coinManager.update();
        }, 100);
    }


    creategameObjects() {
        this.character = new Character(this);
        this.coinManager = new CoinManager(this.character, this.statusBars.find(sb => sb.barType === 'coins'), this.level, this.canvas);
        this.coinsObjects = this.coinManager.createCoins();
    }


    createThrowableObjectsOfStartGame() {
        for (let i = 0; i < this.level.initialBottleCount; i++) {
            const bottle = new ThrowableObject();
            bottle.canvas = this.canvas;
            this.throwableObjects.push(bottle);
        }
    }

    createStatusBars(colorTheme) {
        const statusHealthBar = new StatusBar('health', colorTheme);
        const statusCoinsBar = new StatusBar('coins', colorTheme);
        statusCoinsBar.pos_y = statusHealthBar.pos_y + 50;
        statusCoinsBar.percentage = 0;
        const statusBottlesBar = new StatusBar('bottles', colorTheme);
        statusBottlesBar.pos_y = statusCoinsBar.pos_y + 50;
        this.statusBars.push(statusHealthBar);
        this.statusBars.push(statusCoinsBar);
        this.statusBars.push(statusBottlesBar);
        /*this.statusEndbossBar = new StatusBar('endboss', colorTheme); */
    }





    checkColisions(enemy) {
        if (this.character.isColliding(enemy)) {
            this.character.hit();
            const bar = this.statusBars.find(sb => sb.barType === 'health');
            bar.setPercentage(this.character.energy);
            if(enemy instanceof Endboss && !this.character.isDead){
                const endboss = this.level.enemies.find(e => e instanceof Endboss); 
                if(!endboss.isAttacking){
                    endboss.attack();
                }
            }
        }
    }

    checkColisionsWithThrowableObjects(enemy) {

        if(this.currentBottle == null) return;
        if(!this.currentBottle.isFlying) return;
        if(!this.currentBottle.isColliding(enemy)) return;

        this.currentBottle.isFlying = false;
        this.currentBottle.splashing();


        /* enemy.hit();
            this.statusBar.setPercentage(enemy.energy); */

        /* const index = this.throwableObjects.findIndex(bottle => bottle.isColliding(enemy) && bottle.isFlying);
        if(index !== -1){
            this.throwableObjects[index].isFlying = false;
            this.throwableObjects[index].splashing();
            
            
        } */
    }


    checkThrowableObjects() {
        if(this.keyboard.throwing && !this.isThrowing){
            if(this.throwableObjects.length <= 0) return;
            this.isThrowing = true;
            let bottle = this.throwableObjects.pop();
            this.currentBottle = bottle;

            const bar = this.statusBars.find(sb => sb.barType === 'bottles');
            bar.setPercentage(this.throwableObjects.length * 10);

            const pos_x = this.character.otherDirection ? this.character.pos_x - this.character.offset.right + 40 : this.character.pos_x + 70;
            const pos_y = this.character.pos_y + 150;
            bottle.fling(pos_x, pos_y, this.character.otherDirection);
        }

        if(this.keyboard.allKeysReleased){
            this.isThrowing = false;
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);


        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars();
        this.ctx.translate(this.camera_x, 0);

        this.drawBottle();
        this.drawCoins();

        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }


    drawBottle(){
        if(this.currentBottle && !this.currentBottle.isSplashed){
            this.addToMap(this.currentBottle);
        }else{
            this.currentBottle = null;
        }
    }

    drawStatusBars() {
        this.statusBars.forEach(statusBar => {
            this.addToMap(statusBar);
        });
    }

    drawCoins(){
        this.coinsObjects.forEach(coin => {
            if(!coin.isOutOfScreen){
                this.addToMap(coin);
            }
        });
    }


    addToMap(mo) {

        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        mo.drawFrame(this.ctx);
        mo.drawOffsetFrame(this.ctx);

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
            alert('Game Over! Try again!');
            location.reload();
        }, 100);
    }

    


}