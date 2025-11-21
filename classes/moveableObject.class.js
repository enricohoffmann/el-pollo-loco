class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    damage = 0;
    lastHit = 0;
    currentImagePathIndex = 0;
    deathAnimationStarted = false;

    constructor() {
        super();
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
        if(index >= images.length){
            if(onFinished){
               onFinished();
            }
            return;
        }

        const imagePath = images[index];
        this.img = this.imageCache[imagePath];
        const currentFrameTime = 500;
        setTimeout(()=>{
            this.playAnimationOnce(images, onFinished, index + 1);
        }, currentFrameTime);
    }


    isAboveGround() {
        return this instanceof ThrowableObject ? true : this.pos_y < 100;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.pos_y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25);
    }

    isColliding(mo) {
        return this.pos_x + this.width > mo.pos_x &&
            this.pos_x < mo.pos_x + mo.width &&
            this.pos_y + this.height > mo.pos_y &&
            this.pos_y < mo.pos_y + mo.height;
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

}