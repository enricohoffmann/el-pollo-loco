class Character extends MoveableObject {
    height = 320;
    width = 150;
    speed = 10;
    damage = 0.5;

    world;
    characterImages = characterImages;

    animationInterval;
    keyboardReadInterval;
    idleInterval;
    lastKeyboardInputTime;
    isSleeping = false;
    isIdle = false;
    offset = { top: 100, right: 40, bottom: 10, left: 30};


    constructor(world) {
        super();
        this.world = world;
        this.loadImages(this.characterImages.CHARACTER_WALKING_IMAGES);
        this.loadImages(this.characterImages.CHARACTER_JUMPING_IMAGES);
        this.loadImages(this.characterImages.CHARACTER_DEAD_IMAGES);
        this.loadImages(this.characterImages.CHARACTER_HURT_IMAGES);
        this.loadImages(this.characterImages.CHARACTER_IDLE_IMAGES);
        this.loadImages(this.characterImages.CHARACTER_IDLE_LONG_IMAGES);
        this.loadImage(this.characterImages.CHARACTER_IDLE_IMAGES[0]);
        this.applyGravity();
        this.animate();
        this.lastKeyboardInputTime = new Date().getTime();
    }


    animate() {

        this.keyboardReadInterval = setInterval(() => {
            this.keyboardReadLoop();
            this.checkIdleTime();
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
            this.playAnimation(this.characterImages.CHARACTER_IDLE_LONG_IMAGES);
        } else {
            this.playAnimation(this.characterImages.CHARACTER_IDLE_IMAGES);
        }
    }


    animationLoop() {
        if (this.isDead && !this.deathAnimationStarted) {
            this.stopIdleLoop();
            this.heDied();
            return;
        } else if (this.isHurt) {
            this.playAnimation(this.characterImages.CHARACTER_HURT_IMAGES);
            this.stopIdleLoop();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.characterImages.CHARACTER_JUMPING_IMAGES);
            this.stopIdleLoop();
        } else if ((this.world.keyboard.keys.ArrowRight && !this.isEndRight) || (this.world.keyboard.keys.ArrowLeft && !this.isEndLeft)) {
            this.playAnimation(this.characterImages.CHARACTER_WALKING_IMAGES);
            this.stopIdleLoop();
        }
    }


    keyboardReadLoop() {
        if (this.world.keyboard.keys.ArrowRight && !this.isEndRight) {
            this.otherDirection = false;
            this.stopIdleLoop();
            this.moveRight();
        }

        if (this.world.keyboard.keys.ArrowLeft && !this.isEndLeft) {
            this.otherDirection = true;
            this.moveLeft();
            this.stopIdleLoop();
        }

        if (this.world.keyboard.jumping && !this.isAboveGround()) {
            this.stopIdleLoop();
            this.jump();
        }

        if (this.world.keyboard.throwing) {
            this.stopIdleLoop();
            this.isSleeping = false;
            this.startIdleLoop();
        }

        if (this.world.keyboard.allKeysReleased && !this.isDead && !this.isHurt) {
            this.startIdleLoop();
        }

        this.world.camera_x = -this.pos_x + 100;
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
        this.playAnimationOnce(this.characterImages.CHARACTER_DEAD_IMAGES, () => {
            this.world.gameOver();
        });
    }




    junmping() {

    }

}