/**
 * @class Character
 * @extends MoveableObject
 * @description Represents the main character in the game with properties and methods for movement, animation, and interaction.
 */

class Character extends MoveableObject {
    height = 320;
    width = 150;
    speed = 10;
    damage = 0.5;
    energy = 200;
    world;
    animationInterval;
    keyboardReadInterval;
    idleInterval;
    lastKeyboardInputTime;
    isSleeping = false;
    isIdle = false;
    offset = { top: 120, right: 40, bottom: 10, left: 30 };
    isHurtTime;


    /**
     * @description Creates an instance of Character.
     * @constructor
     * @param {World} world 
     */
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

    /**
     * @description Sets the initial position of the character on the canvas.
     * @memberof Character
     * @method setPosition
     * @returns {void}
     */
    setPosition() {
        const bottomMargin = 160;
        const characterHeight = this.height - (this.offset.top + this.offset.bottom);
        this.pos_y = this.canvas.height - (bottomMargin + characterHeight);
        this.pos_x = 100;
    }

    /**
     * @description Initializes the animation and keyboard reading loops for the character.
     * @memberof Character
     * @method animate
     * @returns {void}
     */
    animate() {
        this.keyboardReadInterval = setInterval(() => {
            if(window.isGamePaused()) return;
            this.keyboardReadLoop();
            this.checkIdleTime();
            this.lastPosY = this.pos_y;
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if(window.isGamePaused()) return;
            this.animationLoop();
        }, 40);

    }

    /**
     * @description Checks if the character has been idle for a specified duration and updates the sleeping state.
     * @memberof Character
     * @method checkIdleTime
     * @returns {void}
     */
    checkIdleTime() {
        let currentTime = new Date().getTime();
        this.isSleeping = currentTime - this.lastKeyboardInputTime >= 15000;
    }

    /**
     * @description Handles the idle animation loop for the character, switching between normal and long idle animations based on the sleeping state.
     * @memberof Character
     * @method idleLoop
     * @returns {void}
     */
    idleLoop() {
        if (this.isSleeping) {
            this.playAnimation(this.imagesOfType.CHARACTER_IDLE_LONG_IMAGES);
        } else {
            this.playAnimation(this.imagesOfType.CHARACTER_IDLE_IMAGES);
        }
    }

    /**
     * @description Handles the main animation loop for the character, determining which animation to play based on the character's state (dead, hurt, jumping, walking).
     * @memberof Character
     * @method animationLoop
     * @returns 
     */
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


    /**
     * @description Reads keyboard inputs and triggers corresponding character actions such as moving, jumping, throwing, and idling.
     * @memberof Character
     * @method keyboardReadLoop
     * @returns {void}
     */
    keyboardReadLoop() {
        if (this.world.keyboard.keys.ArrowRight && !this.isEndRight) {this.startMoveRight();}
        if (this.world.keyboard.keys.ArrowLeft && !this.isEndLeft) {this.startMoveLeft();}
        if (this.world.keyboard.jumping && !this.isAboveGround()) { this.startJump();}
        if (this.world.keyboard.throwing) {this.startThrow(); }
        if (this.world.keyboard.allKeysReleased && !this.isDead && !this.isHurt) { this.startIdleLoop(); }
        this.setCamaraPosition();
    }

    /**
     * @description Initiates the character's movement to the right, stopping any idle animation.
     * @memberof Character
     * @method startMoveRight
     * @returns {void}
     */
    startMoveRight() {
        this.otherDirection = false;
        this.stopIdleLoop();
        this.moveRight();
    }

    /**
     * @description Initiates the character's movement to the left, stopping any idle animation.
     * @memberof Character
     * @method startMoveLeft
     * @returns {void}
     */
    startMoveLeft() {
        this.otherDirection = true;
        this.stopIdleLoop();
        this.moveLeft();
    }

    /**
     * @description Initiates the character's jump action, stopping any idle animation and playing the jump sound effect.
     * @memberof Character
     * @method startJump
     * @returns {void}
     */
    startJump() {
        this.stopIdleLoop();
        this.world.audioManager.playSoundEffect('../audio/jump.mp3');
        this.jump();
    }

    /**
     * @description Initiates the character's throw action, stopping any idle animation.
     * @memberof Character
     * @method startThrow
     * @returns {void}
     */
    startThrow() {
        this.stopIdleLoop();
        this.isSleeping = false;
        this.startIdleLoop();
    }

    /**
     * @description Updates the camera position to follow the character, ensuring it stays within the level boundaries.
     * @memberof Character
     * @method setCamaraPosition
     * @returns {void}
     */
    setCamaraPosition() {
        const cameraFollowX = -this.pos_x + 100;
        const maxCameraRight = -(this.world.level.level_end_x - this.world.canvas.width);
        this.world.camera_x = Math.max(maxCameraRight, Math.min(cameraFollowX, this.world.maxCameraLeft));
    }

    /**
     * @description Stops the idle animation loop and resets the sleeping and idle states.
     * @memberof Character
     * @method stopIdleLoop
     * @returns {void}
     */
    stopIdleLoop() {
        this.lastKeyboardInputTime = new Date().getTime();
        this.resetAnyInterval(this.idleInterval);
        this.isSleeping = false;
        this.isIdle = false;
    }

    /**
     * @description Starts the idle animation loop if it is not already running.
     * @memberof Character
     * @method startIdleLoop
     * @returns {void}
     */
    startIdleLoop() {
        if (!this.isIdle) {
            this.isIdle = true;
            this.idleInterval = setInterval(() => {
                if(window.isGamePaused()) return;
                this.idleLoop();
            }, 100);
        }
    }

    /**
     * @description Resets a given interval by clearing it if it exists.
     * @memberof Character
     * @method resetAnyInterval
     * @param {*} interval 
     * @returns {void}
     */
    resetAnyInterval(interval) {
        if (interval) {
            clearInterval(interval);
        }
    }

    /**
     * @description Handles the character's death sequence, playing the death animation and triggering the game over state.
     * @memberof Character
     * @method heDied
     * @returns {void}
     */
    heDied() {
        this.deathAnimationStarted = true;
        this.resetAnyInterval(this.keyboardReadInterval);
        this.resetAnyInterval(this.animationInterval);
        this.playAnimationOnce(this.imagesOfType.CHARACTER_DEAD_IMAGES, () => {
            this.world.gameOver();
        });
    }

    /**
     * @description Plays the hurt sound effect for the character, ensuring it is not played too frequently.
     * @memberof Character
     * @method playHurtSound
     * @returns 
     */
    playHurtSound() {
        if (!this.isHurtTime){
            this.isHurtTime = new Date().getTime();
            this.world.audioManager.playSoundEffect('../audio/character-hurt.mp3');
            return;
        };

        if( new Date().getTime() - this.isHurtTime < 500) return;
        this.isHurtTime = new Date().getTime();
        this.world.audioManager.playSoundEffect('../audio/character-hurt.mp3');
    }


}