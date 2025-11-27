class World {

    character;
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    maxCameraLeft = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    isThrowing = false;
    

    constructor(canvas, keyboard, level) {
        this.level = level;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.character = new Character(this);
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
        }, 100);
    }


    checkColisions(enemy) {
        if (this.character.isColliding(enemy)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
            if(enemy instanceof Endboss && !this.character.isDead){
                const endboss = this.level.enemies.find(e => e instanceof Endboss); 
                if(!endboss.isAttacking){
                    endboss.attack();
                }
            }
        }
    }

    checkColisionsWithThrowableObjects(enemy) {
        const index = this.throwableObjects.findIndex(bottle => bottle.isColliding(enemy) && bottle.isFlying);
        if(index !== -1){
            this.throwableObjects[index].isFlying = false;
            this.throwableObjects[index].splashing();
            
            /* enemy.hit();
            this.statusBar.setPercentage(enemy.energy); */
        }
    }

    checkThrowableObjects() {
        if(this.keyboard.throwing && !this.isThrowing){
            this.isThrowing = true;
            let bottle = new ThrowableObject();
            bottle.canvas = this.canvas;
            this.throwableObjects.push(bottle);
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
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.drawBottle();

        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }


    drawBottle(){
        this.throwableObjects.forEach(bottle => {
            if(!bottle.isSplashed){
                this.addToMap(bottle);
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