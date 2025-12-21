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

    constructor() {
        super();
    }

    setSize(heightInPercent, ratioWidthToHeight) {
        this.height = this.canvas.height * heightInPercent;
        this.width = this.height / ratioWidthToHeight;
    }

    moveLeft() {
        this.pos_x -= this.speed;
    }

    moveRight() {
        this.pos_x += this.speed;
    }

    playAnimation(images) {
        this.currentImagePathIndex = this.currentImageIndex % images.length;
        let path = images[this.currentImagePathIndex];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

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


    isAboveGround() {

        if (this instanceof ThrowableObject) { return true; }

        const groundY = this.canvas.height - 50;
        const objectBottomY = this.pos_y + this.height - this.offset.bottom;
        return objectBottomY < groundY;
    }


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

    isColliding(mo) {
        return this.pos_x + this.width - this.offset.right > mo.pos_x + mo.offset.left &&
            this.pos_x + this.offset.left < mo.pos_x + mo.width - mo.offset.right &&
            this.pos_y + this.height - this.offset.bottom > mo.pos_y + mo.offset.top &&
            this.pos_y + this.offset.top < mo.pos_y + mo.height - mo.offset.bottom;
    }

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



    jump() {
        this.speedY = 30;
    }

    hit() {
        this.energy -= this.damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    get isDead() {
        return this.energy == 0;
    }

    get isHurt() {
        const timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 1000;
    }

    get isEndLeft() {
        return this.pos_x < 110;
    }

    get isEndRight() {
        return this.pos_x + this.width >= this.world.level.level_end_x;
    }

    get getGroundY() {
        const groundY = this.canvas.height - 50;
        return groundY - (this.height - this.offset.bottom);
    }

}