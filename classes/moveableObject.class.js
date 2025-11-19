class MoveableObject {
    pos_x = 100;
    pos_y = 120;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImageIndex = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    damage = 0;

    constructor() {

    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drow(ctx){
        ctx.drawImage(this.img, this.pos_x, this.pos_y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "blue";
            ctx.rect(this.pos_x, this.pos_y, this.width, this.height);
            ctx.stroke();
        }
    }

    moveLeft() {
        this.pos_x -= this.speed;
    }

    moveRight() {
        this.pos_x += this.speed;
    }

    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

    isAboveGround() {
        return this.pos_y < 100;
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

}