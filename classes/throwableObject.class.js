
/**
 * @class ThrowableObject
 * @extends MoveableObject
 * @description Represents a throwable object that can be thrown, fly through the air, and splash upon impact.
 */
class ThrowableObject extends MoveableObject {

    throwInterval;
    isSplashed = false;
    isFlying = false;

    /**
     * @description Constructs a ThrowableObject instance with default properties and loads images.
     * @memberOf ThrowableObject
     * @constructor
     */
    constructor() {
        super();
        this.pos_x = 100;
        this.pos_y = 100;
        this.width = 80;
        this.height = 80;
        this.loadTypeImages(bottleImages);
        this.loadImage(this.imagesOfType.BOTTLE_STANDARD[0]);
        this.acceleration = 2.5;

    }

    /**
     * @description Throws the object from a specified position in a given direction.
     * @memberOf ThrowableObject
     * @method fling
     * @param {number} x 
     * @param {number} y 
     * @param {boolean} otherDirection 
     * @returns {void}
     */
    fling(x, y, otherDirection = false) {
        this.pos_x = x - this.offset.right;
        this.pos_y = y;
        this.speedY = 30;
        this.applyGravityBottle();
        this.isFlying = true;


        this.throwInterval = window.createStoppableInterval(() => {
            otherDirection ? this.pos_x -= 10 : this.pos_x += 10;
            this.playAnimation(this.imagesOfType.BOTTLE_FLYING);
            this.checkIfBottleIsOnGround();
        }, 25);

    }

    /**
     * @description Applies gravity to the throwable object, updating its position over time.
     * @memberOf ThrowableObject
     * @method applyGravityBottle
     * @returns {void}
     */
    applyGravityBottle() {
        this.gravityInterval = window.createStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.pos_y -= this.speedY;
                this.speedY -= this.acceleration;
            }else{  
                this.pos_y = this.isOnGround();   
                this.speedY = 0;
            }

        }, 1000 / 25);
    }

    /**
     * @description Checks if the bottle has hit the ground and triggers splashing if so.
     * @memberOf ThrowableObject
     * @method checkIfBottleIsOnGround
     * @returns {void}
     */
    checkIfBottleIsOnGround() {
        if (this.pos_y >= this.canvas.height - 100 && !this.isSplashed) {
            this.splashing();
        }

    }

    /**
     * @description Triggers the splashing animation and stops movement.
     * @memberOf ThrowableObject
     * @method splashing
     * @returns {void}
     */
    splashing() {
        window.removeOneGameInterval(this.gravityInterval);
        window.removeOneGameInterval(this.throwInterval);
        this.speedY = 0;
        this.playAnimationOnce(this.imagesOfType.BOTTLE_SPLASH, () => {
            if (this.currentImageIndex >= this.imagesOfType.BOTTLE_SPLASH.length) {
                this.isSplashed = true;
                this.isFlying = false;
            }
        });
    }


}
