class Character extends MoveableObject {
    height = 320;
    width = 150;
    speed = 10;
    damage = 0.5;

    world;
    animationInterval;
    keyboardReadInterval;
    idleInterval;
    lastKeyboardInputTime;
    isSleeping = false;
    isIdle = false;
    offset = { top: 120, right: 40, bottom: 10, left: 30 };


    constructor(world) {
        super();
        this.world = world;
        this.canvas = world.canvas;
        this.loadTypeImages(characterImages);
        this.loadImage(this.imagesOfType.CHARACTER_IDLE_IMAGES[0]);
        this.applyGravity();
        this.setSize(0.65, 2.13);
        this.setPosition();
        this.animate();
        this.lastKeyboardInputTime = new Date().getTime();
    }

    setPosition() {
        const bottomMargin = 160;
        const characterHeight = this.height - (this.offset.top + this.offset.bottom);
        this.pos_y = this.canvas.height - (bottomMargin + characterHeight);
        this.pos_x = 100;
    }

    animate() {

        this.keyboardReadInterval = setInterval(() => {
            this.keyboardReadLoop();
            this.checkIdleTime();
            this.lastPosY = this.pos_y;
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            this.animationLoop();
        }, 40);

    }

    checkIdleTime() {
        let currentTime = new Date().getTime();
        this.isSleeping = currentTime - this.lastKeyboardInputTime >= 15000;
    }

    idleLoop() {
        if (this.isSleeping) {
            this.playAnimation(this.imagesOfType.CHARACTER_IDLE_LONG_IMAGES);
        } else {
            this.playAnimation(this.imagesOfType.CHARACTER_IDLE_IMAGES);
        }
    }


    animationLoop() {
        if (this.isDead && !this.deathAnimationStarted) {
            this.stopIdleLoop();
            this.heDied();
            return;
        } else if (this.isHurt) {
            this.playAnimation(this.imagesOfType.CHARACTER_HURT_IMAGES);
            this.stopIdleLoop();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.imagesOfType.CHARACTER_JUMPING_IMAGES);
            this.stopIdleLoop();
        } else if ((this.world.keyboard.keys.ArrowRight && !this.isEndRight) || (this.world.keyboard.keys.ArrowLeft && !this.isEndLeft)) {
            this.playAnimation(this.imagesOfType.CHARACTER_WALKING_IMAGES);
            this.stopIdleLoop();
        }
    }


    keyboardReadLoop() {

        if (this.world.keyboard.keys.ArrowRight && !this.isEndRight) {
            this.startMoveRight();
        }

        if (this.world.keyboard.keys.ArrowLeft && !this.isEndLeft) {
            this.startMoveLeft();
        }

        if (this.world.keyboard.jumping && !this.isAboveGround()) {
            this.startJump();
        }

        if (this.world.keyboard.throwing) {
            this.startThrow();
        }

        if (this.world.keyboard.allKeysReleased && !this.isDead && !this.isHurt) {
            this.startIdleLoop();
        }

        this.setCamaraPosition();
    }

    startMoveRight() {
        this.otherDirection = false;
        this.stopIdleLoop();
        this.moveRight();
    }

    startMoveLeft() {
        this.otherDirection = true;
        this.stopIdleLoop();
        this.moveLeft();
    }

    startJump() {
        this.stopIdleLoop();
        this.jump();
    }

    startThrow() {
        this.stopIdleLoop();
        this.isSleeping = false;
        this.startIdleLoop();
    }

    setCamaraPosition() {
        const cameraFollowX = -this.pos_x + 100;
        const maxCameraRight = -(this.world.level.level_end_x - this.world.canvas.width);
        this.world.camera_x = Math.max(maxCameraRight, Math.min(cameraFollowX, this.world.maxCameraLeft));
    }

    stopIdleLoop() {
        this.lastKeyboardInputTime = new Date().getTime();
        this.resetAnyInterval(this.idleInterval);
        this.isSleeping = false;
        this.isIdle = false;
    }

    startIdleLoop() {
        if (!this.isIdle) {
            this.isIdle = true;
            this.idleInterval = setInterval(() => {
                this.idleLoop();
            }, 100);
        }
    }

    resetAnyInterval(interval) {
        if (interval) {
            clearInterval(interval);
        }
    }

    heDied() {
        this.deathAnimationStarted = true;
        this.resetAnyInterval(this.keyboardReadInterval);
        this.resetAnyInterval(this.animationInterval);
        this.playAnimationOnce(this.imagesOfType.CHARACTER_DEAD_IMAGES, () => {
            this.world.gameOver();
        });
    }





}