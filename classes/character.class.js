class Character extends MoveableObject {
    height = 320;
    width = 150;
    speed = 10;
    damage = 5;

    CHARACTER_WALKING_IMAGES = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    CHARACTER_JUMPING_IMAGES = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    CHARACTER_DEAD_IMAGES = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    CHARACTER_HURT_IMAGES = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    CHARACTER_IDLE_IMAGES = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    CHARACTER_IDLE_LONG_IMAGES = [
        'img/2_character_pepe/1_idle/long_idle/IL-11.png',
        'img/2_character_pepe/1_idle/long_idle/IL-12.png',
        'img/2_character_pepe/1_idle/long_idle/IL-13.png',
        'img/2_character_pepe/1_idle/long_idle/IL-14.png',
        'img/2_character_pepe/1_idle/long_idle/IL-15.png',
        'img/2_character_pepe/1_idle/long_idle/IL-16.png',
        'img/2_character_pepe/1_idle/long_idle/IL-17.png',
        'img/2_character_pepe/1_idle/long_idle/IL-18.png',
        'img/2_character_pepe/1_idle/long_idle/IL-19.png',
        'img/2_character_pepe/1_idle/long_idle/IL-20.png'
    ];

    world;

    animationInterval;
    keyboardReadInterval;
    idleInterval;
    lastKeyboardInputTime;
    isSleeping = false;
    isIdle = false;


    constructor(world) {
        super();
        this.world = world;
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.CHARACTER_WALKING_IMAGES);
        this.loadImages(this.CHARACTER_JUMPING_IMAGES);
        this.loadImages(this.CHARACTER_DEAD_IMAGES);
        this.loadImages(this.CHARACTER_HURT_IMAGES);
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

        this.idleInterval = setInterval(() => {
            this.idleLoop();
        }, 40);

    }

    checkIdleTime() {
        let currentTime = new Date().getTime();
        this.isSleeping = currentTime - this.lastKeyboardInputTime >= 15000;
    }

    idleLoop(){
        if(this.isSleeping){
            this.playAnimation(this.CHARACTER_IDLE_LONG_IMAGES);
        }else{
            this.playAnimation(this.CHARACTER_IDLE_IMAGES);
        }
    }


    animationLoop() {
        if (this.isDead && !this.deathAnimationStarted) {
            this.heDied();
            return;
        } else if (this.isHurt) {
            this.playAnimation(this.CHARACTER_HURT_IMAGES);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.CHARACTER_JUMPING_IMAGES);
        } else if (this.world.keyboard.keys.ArrowRight || this.world.keyboard.keys.ArrowLeft) {
            this.playAnimation(this.CHARACTER_WALKING_IMAGES);
        }
    }


    keyboardReadLoop() {
        if (this.world.keyboard.keys.ArrowRight && this.pos_x < this.world.level.level_end_x) {
            this.otherDirection = false;
            this.stopIdleLoop();
            this.moveRight();
        }

        if (this.world.keyboard.keys.ArrowLeft && this.pos_x > 100) {
            this.otherDirection = true;
            this.moveLeft();
            this.stopIdleLoop();
        }

        if (this.world.keyboard.jumping && !this.isAboveGround()) {
            this.stopIdleLoop();
            this.jump();
        }

        if(this.world.keyboard.allKeysReleased){
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
        this.playAnimationOnce(this.CHARACTER_DEAD_IMAGES, () => {
            this.world.gameOver();
        });
    }




    junmping() {

    }

}