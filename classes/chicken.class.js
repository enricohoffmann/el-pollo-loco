/**
 * @class Chicken
 * @description Represents a chicken enemy in the game. Extends the MoveableObject class.
 * @extends MoveableObject
 */

class Chicken extends MoveableObject {

    pos_y = 350;
    height = 75;
    width = 75;
    damage = 5;
    EMEMY_WALKING_IMAGES = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    ENEMY_DEAD_IMAGES = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    killbox = { top: 10, right: 10, bottom: 10, left: 10 };

    chickenWalkInterval;
    chickenAnimationInterval;

    /**
     * @description Creates an instance of Chicken.
     * @memberof Chicken
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas on which the chicken will be drawn.
     * @param {Number} level_end_x - The x-coordinate representing the end of the level.
     */
    constructor(canvas, level_end_x) {
        super();
        this.canvas = canvas;
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.EMEMY_WALKING_IMAGES);
        this.pos_x = this.getRandomObjectPosition(300, level_end_x - 100);
        this.pos_y = this.canvas.height - this.height - 30;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * @description Animates the chicken by moving it left and cycling through walking images.
     * @memberof Chicken
     * @method animate
     * @returns {void}
     */
    animate() {
        this.chickenWalkInterval = setInterval(() => {

            if(window.isGamePaused()) return;

            if (this.isDead) {
                this.die();
                return;
            }
            this.moveLeft();
        }, 1000 / 60);

        this.chickenAnimationInterval = setInterval(() => {
            if(window.isGamePaused()) return;
            this.playAnimation(this.EMEMY_WALKING_IMAGES);
        }, 200);
    }

    /**
     * @description Handles the death of the chicken by playing the death animation and removing it from the game.
     * @memberof Chicken
     * @method die
     * @returns {void}
     */
    die() {
        clearInterval(this.chickenWalkInterval);
        clearInterval(this.chickenAnimationInterval);
        this.loadImages(this.ENEMY_DEAD_IMAGES);
        this.playAnimationOnce(this.ENEMY_DEAD_IMAGES, () => {
            setTimeout(() => {
                this.pos_y = -1000;
            }, 500);
        });
    }
}