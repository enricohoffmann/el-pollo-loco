/**
 * @class Bottle
 * @extends DrawableObject
 * @description Represents a bottle object in the game that can be collected by the player.
 */

class Bottle extends DrawableObject {
    width = 60;
    height = 80;
    bottleFiles = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    collectedBottleFile = 'img/6_salsa_bottle/salsa_bottle.png';
    isCollected = false;
    currentBottleIndex = 0;
    isOutOfScreen = false;
    bottleImageIndex = 99;

    /**
     * @description Creates a new Bottle object.
     * @memberOf Bottle
     * @constructor
     * @param {Number} canvasHeight - The height of the canvas.
     * @param {Number} levelLength - The length of the level.
     * @param {Number} bottleImageIndex - The index of the bottle image to use. If not provided, a random index will be chosen.
     * @return {void}
     */
    constructor(canvasHeight, levelLength, bottleImageIndex = 99) {
        super();
        this.bottleImageIndex = bottleImageIndex;
        if (this.bottleImageIndex === 99) {
            this.bottleImageIndex = Math.floor(Math.random() * this.bottleFiles.length);
        }
        this.loadImage(this.bottleFiles[this.bottleImageIndex]);
        this.setPosition(canvasHeight, levelLength);
    }

    /**
     * @description Sets the position of the bottle on the canvas.
     * @memberOf Bottle
     * @method setPosition
     * @param {Number} canvasHeight 
     * @param {Number} levelLength 
     * @return {void}
     */
    setPosition(canvasHeight, levelLength) {
        const groundLevel = canvasHeight - 110;
        this.pos_y = groundLevel;
        this.pos_x = this.getRandomObjectPosition(250, levelLength - 500);
    }

    /**
     * @description Animates the collection of the bottle by moving it upwards until it goes off-screen.
     * @memberOf Bottle
     * @method animateCollectet
     * @param {boolean} onFinished 
     * @returns {void}
     */
    animateCollectet(onFinished) {
        if (this.pos_y < -20) {
            if (onFinished) {
                onFinished();
            }
            return;
        }

        this.loadImage(this.collectedBottleFile);
        this.pos_y -= 5;
        const animationFrameTime = 25;

        setTimeout(() => {
            this.animateCollectet(onFinished);
        }, animationFrameTime);
    }

}