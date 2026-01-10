/**
 * @class Endboss
 * @extends MoveableObject
 * @description Represents the end boss character in the game with its behaviors and animations.
 */

class Endboss extends MoveableObject {

    height = 400;
    width = 250;
    pos_x = 700;
    pos_y = 60;
    damage = 20;
    energy = 100;
    animationInterval;
    attackInterval;
    walkingInterval;
    offset = { top: 50, right: 10, bottom: 10, left: 10 };
    killbox = { top: 110, right: 70, bottom: 20, left: 70 };
    lastAttackTime = 0;
    isAttacking = false;
    endBossStatusBar;
    state;
    world;


    /**
     * @description Creates an instance of the Endboss.
     * @memberOf Endboss
     * @constructor
     * @param {HTMLCanvasElement} canvas 
     * @param {Number} level_end_x 
     */
    constructor(canvas, level_end_x) {
        super();
        this.canvas = canvas;
        this.end_pos_x = level_end_x;
        this.loadTypeImages(endbossImages);
        this.loadImage(this.imagesOfType.ENDBOSS_ALERT_IMAGES[0]);
        this.setSize(0.75, 1.44);
        this.setEndbossPosition();
        this.speed = 0.15;
        this.animate();
    }

    /**
     * @description Sets the initial position of the end boss based on the level's end position.
     * @memberOf Endboss
     * @method setEndbossPosition
     * @returns {void}
     */
    setEndbossPosition() {
        this.pos_x = this.end_pos_x - (this.width + 80);
        const endbossHeight = this.height - (this.offset.top + this.offset.bottom);
        const bottomMargin = 80;
        this.pos_y = this.canvas.height - (bottomMargin + endbossHeight);
    }

    /**
     * @description Initiates the animation sequence for the end boss after a delay.
     * @memberOf Endboss
     * @method animate
     * @returns {void}
     */
    animate() {
        setTimeout(() => {
            this.walkingAnimation();
        }, 5000);

    }

    /**
     * @description Handles the walking animation of the end boss.
     * @memberOf Endboss
     * @method walkingAnimation
     * @returns {void}
     */
    walkingAnimation() {
        if (this.state === 'dead') return;
        this.state = 'walk';

        clearInterval(this.attackAnimationInterval);
        clearInterval(this.hurtAnimationInterval);

        this.animationInterval = setInterval(() => {
            if (this.state !== 'walk') return;
            if(window.isGamePaused()) return;
            this.playAnimation(this.imagesOfType.ENDBOSS_WALKING_IMAGES);
        }, 160);

        this.walkingInterval = setInterval(() => {
            if (this.state !== 'walk') return;
            if(window.isGamePaused()) return;
            this.moveLeft();
            this.moveStatusBar();
            this.checkEndbossReachedLeftEdge();
        }, 1000 / 60);

    }

    /**
     * @description Checks if the end boss has reached the left edge of the screen and triggers game over if true.
     * @memberOf Endboss
     * @method checkEndbossReachedLeftEdge
     * @returns {void}
     */
    checkEndbossReachedLeftEdge() {
        const leftEdgeX = this.pos_x <= 100;

        if (leftEdgeX) {
            clearInterval(this.walkingInterval);
            clearInterval(this.animationInterval);
            this.world.gameOver();
        }


    }

    /**
     * @description Updates the position of the end boss's status bar to match its current position.
     * @memberOf Endboss
     * @method moveStatusBar
     * @returns {void}
     */
    moveStatusBar() {
        if (this.endBossStatusBar) {
            this.endBossStatusBar.pos_x = this.pos_x;
        }
    }

    /**
     * @description Initiates the attack sequence of the end boss.
     * @memberOf Endboss
     * @method attack
     * @returns {void}
     */
    attack() {
        if (this.state === 'dead' || this.state === 'hurt') return;
        if (this.state === 'attack') return;

        this.state = 'attack';
        this.isAttacking = true;
        this.lastAttackTime = new Date().getTime();
        clearInterval(this.animationInterval);
        clearInterval(this.walkingInterval);
        this.attackAnimation();
    }

    /**
     * @description Handles the attack animation of the end boss.
     * @memberOf Endboss
     * @method attackAnimation
     * @returns {void}
     */
    attackAnimation() {
        this.attackAnimationInterval = setInterval(() => {
            this.playAnimation(this.imagesOfType.ENDBOSS_ATTACK_IMAGES);
            const attackDuration = new Date().getTime() - this.lastAttackTime;
            if (attackDuration >= 3000) {
                this.isAttacking = false;
                this.lastAttackTime = 0;
                clearInterval(this.attackAnimationInterval);
                this.attackAnimationInterval = null;

                if (this.state === "attack") {
                    this.walkingAnimation();
                }
            }
        }, 160);

    }

    /**
     * @description Initiates the hurt animation of the end boss.
     * @memberOf Endboss
     * @method hurt
     * @returns {void}
     */
    hurt() {
        if (this.state === 'dead') return;
        this.state = 'hurt';
        this.lastHurtTime = new Date().getTime() + 800;

        clearInterval(this.animationInterval);
        clearInterval(this.walkingInterval);
        clearInterval(this.attackAnimationInterval);

        if (this.hurtAnimationInterval) return;

        this.hurtAnimation();
    }

    /**
     * @description Handles the hurt animation of the end boss.
     * @memberOf Endboss
     * @method hurtAnimation
     * @returns {void}
     */
    hurtAnimation() {
        this.hurtAnimationInterval = setInterval(() => {

            if (Date.now() < this.lastHurtTime && this.state === 'hurt') {
                this.playAnimation(this.imagesOfType.ENDBOSS_HURT_IMAGES);
                return;
            }

            clearInterval(this.hurtAnimationInterval);
            this.hurtAnimationInterval = null;

            if ((this.state !== 'dead')) {
                this.walkingAnimation();
            }
        }, 160);
    }

    /**
     * @description Handles the death sequence of the end boss.
     * @memberOf Endboss
     * @method endbossDied
     * @returns {void}
     */
    endbossDied() {
        this.state = 'dead';
        clearInterval(this.animationInterval);
        clearInterval(this.walkingInterval);
        clearInterval(this.attackAnimationInterval);
        clearInterval(this.hurtAnimationInterval);

        this.attackAnimationInterval = null;
        this.hurtAnimationInterval = null;

        this.playAnimationOnce(this.imagesOfType.ENDBOSS_DEAD_IMAGES, () => {
            this.endBossStatusBar.pos_y = -100;
            this.pos_x = -1000;
            this.world.checkWinCondition();
        });

    }

    /**
     * @description Handles the event when the end boss is hit.
     * @memberOf Endboss
     * @method entbossHit
     * @returns {void}
     */
    entbossHit() {

        this.hit();
        this.hurt();

        if (this.endBossStatusBar) {
            this.endBossStatusBar.setPercentage(this.energy);
        }

        if (this.isDead) {
            this.endbossDied();
        }
    }

}