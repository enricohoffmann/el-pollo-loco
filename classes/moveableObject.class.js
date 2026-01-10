/**
 * @class MoveableObject
 * @extends DrawableObject
 * @description Represents a moveable object in the game with properties and methods for movement, collision detection, and state management.
 */
class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    damage = 0;
    lastHit = 0;
    currentImagePathIndex = 0;
    deathAnimationStarted = false;
    gravityInterval;
    lastHurtTime = 0;
    hurtAnimationInterval;
    canvas;
    lastPosY = 0;

    /**
     * @description Constructs a MoveableObject instance and initializes its properties.
     * @memberOf MoveableObject
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * @description Sets the size of the moveable object based on the canvas height and specified ratios.
     * @memberOf MoveableObject
     * @method setSize
     * @param {number} heightInPercent - The height of the object as a percentage of the canvas height.
     * @param {number} ratioWidthToHeight - The ratio of width to height for the object.
     * @return {void}
     */
    setSize(heightInPercent, ratioWidthToHeight) {
        this.height = this.canvas.height * heightInPercent;
        this.width = this.height / ratioWidthToHeight;
    }

    /**
     * @description Moves the object to the left by its speed.
     * @memberOf MoveableObject
     * @method moveLeft
     * @return {void}
     */
    moveLeft() {
        this.pos_x -= this.speed;
    }

    /**
     * @description Moves the object to the right by its speed.
     * @memberOf MoveableObject
     * @method moveRight
     * @return {void}
     */
    moveRight() {
        this.pos_x += this.speed;
    }

    /**
     * @description Plays an animation by cycling through an array of image paths.
     * @memberOf MoveableObject
     * @method playAnimation
     * @param {Array<string>} images - An array of image paths for the animation.
     * @return {void}
     */
    playAnimation(images) {
        this.currentImagePathIndex = this.currentImageIndex % images.length;
        let path = images[this.currentImagePathIndex];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

    /**
     * @description Plays an animation once by cycling through an array of image paths and then calls a callback function.
     * @memberOf MoveableObject
     * @method playAnimationOnce
     * @param {Array<string>} images 
     * @param {Function} onFinished 
     * @param {number} index 
     * @returns {void}
     */
    playAnimationOnce(images, onFinished, index = 0) {
        if (index >= images.length) {
            if (onFinished) {
                onFinished();
            }
            return;
        }

        const imagePath = images[index];
        this.img = this.imageCache[imagePath];
        const currentFrameTime = 500;
        setTimeout(() => {
            this.playAnimationOnce(images, onFinished, index + 1);
        }, currentFrameTime);
    }

    /**
     * @description Checks if the object is above the ground level.
     * @memberOf MoveableObject
     * @method isAboveGround
     * @returns {boolean}
     */
    isAboveGround() {

        if (this instanceof ThrowableObject) { return true; }

        const groundY = this.canvas.height - 50;
        const objectBottomY = this.pos_y + this.height - this.offset.bottom;
        return objectBottomY < groundY;
    }

    /**
     * @description Applies gravity to the object, updating its vertical position and speed.
     * @memberOf MoveableObject
     * @method applyGravity
     * @return {void}
     */
    applyGravity() {
        this.lastPosY = this.pos_y;

        if (this.isAboveGround() || this.speedY > 0) {
            this.pos_y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.pos_y = this.getGroundY;
            this.speedY = 0;
        }
    }

    /**
     * @description Checks if this object is colliding with another moveable object, considering optional kill and offset boxes.
     * @memberOf MoveableObject
     * @method isColliding
     * @param {MoveableObject} - The other moveable object to check collision against. 
     * @param {Object} killBox - Optional kill box offsets for this object.
     * @param {Object} offsetBox - Optional offset box offsets for the other object.
     * @returns {boolean}
     */
    isColliding(mo, killBox = null, offsetBox = null) {

        const box_a = killBox ?? this.offset ?? { top: 0, right: 0, bottom: 0, left: 0 };
        const box_b = offsetBox ?? mo.offset ?? { top: 0, right: 0, bottom: 0, left: 0 };


        return this.pos_x + this.width - box_a.right > mo.pos_x + box_b.left &&
            this.pos_x + box_a.left < mo.pos_x + mo.width - box_b.right &&
            this.pos_y + this.height - box_a.bottom > mo.pos_y + box_b.top &&
            this.pos_y + this.offset.top < mo.pos_y + mo.height - mo.offset.bottom;
    }

    /**
     * @description Checks if this object is colliding with the top of another moveable object.
     * @memberOf MoveableObject
     * @method isCollidingTop
     * @param {MoveableObject} mo 
     * @returns {boolean}
     */
    isCollidingTop(mo) {
        const isOverlappingX =
            this.pos_x + this.width - this.offset.right > mo.pos_x + mo.offset.left &&
            this.pos_x + this.offset.left < mo.pos_x + mo.width - mo.offset.right;

        const falling = this.speedY < 0;

        const bottomNow = this.pos_y + this.height - this.offset.bottom;
        const bottomLast = this.lastPosY + this.height - this.offset.bottom;
        const enemyTop = mo.pos_y + mo.offset.top;

        const crossedTop = bottomLast <= enemyTop && bottomNow >= enemyTop;

        return isOverlappingX && falling && crossedTop;
    }


    /**
     * @description Makes the object jump by setting its vertical speed.
     * @memberOf MoveableObject
     * @method jump
     * @return {void}
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * @description Reduces the object's energy by its damage value and updates the last hit time.
     * @memberOf MoveableObject
     * @method hit
     * @return {void}
     */
    hit() {
        this.energy -= this.damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * @description Checks if the object is dead (energy is zero).
     * @memberOf MoveableObject
     * @method isDead
     * @returns {boolean}
     */
    get isDead() {
        return this.energy == 0;
    }

    /**
     * @description Checks if the object is currently hurt (within 1 second of last hit).
     * @memberOf MoveableObject
     * @method isHurt
     * @returns {boolean}
     */
    get isHurt() {
        const timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 1000;
    }

    /**
     * @description Checks if the object has reached the left end of the level.
     * @memberOf MoveableObject
     * @method isEndLeft
     * @returns {boolean}
     */
    get isEndLeft() {
        return this.pos_x < 110;
    }

    /**
     * @description Checks if the object has reached the right end of the level.
     * @memberOf MoveableObject
     * @method isEndRight
     * @returns {boolean}
     */
    get isEndRight() {
        return this.pos_x + this.width >= this.world.level.level_end_x;
    }

    /**
     * @description Calculates the ground Y position for the object based on the canvas height and object height.
     * @memberOf MoveableObject
     * @method getGroundY
     * @returns {number}
     */
    get getGroundY() {
        const groundY = this.canvas.height - 50;
        return groundY - (this.height - this.offset.bottom);
    }

}