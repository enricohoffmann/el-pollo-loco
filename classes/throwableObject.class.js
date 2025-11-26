class ThrowableObject  extends MoveableObject {

    throwInterval;
    isSplashed = false;

    constructor(){
        super();
        this.pos_x = 100;
        this.pos_y = 100;
        this.width = 80;
        this.height = 80;
        this.loadTypeImages(bottleImages);
        this.loadImage(this.imagesOfType.BOTTLE_STANDARD[0]);
        
    }

    fling(x, y, otherDirection = false) {
        this.pos_x = x - this.offset.right;
        this.pos_y = y;
        this.speedY = 30;
        this.applyGravity();
        
        
        this.throwInterval = setInterval(() => {
            otherDirection ? this.pos_x -= 10 : this.pos_x += 10;
            this.playAnimation(this.imagesOfType.BOTTLE_FLYING);
            this.checkIfBottleIsOnGround();
        }, 25);

    }

    checkIfBottleIsOnGround() {
        if (this.pos_y >= this.canvas.height - 100 && !this.isSplashed) {
            clearInterval(this.gravityInterval);
            clearInterval(this.throwInterval);
            this.speedY = 0;
            this.playAnimationOnce(this.imagesOfType.BOTTLE_SPLASH, () => {
                if(this.currentImageIndex >= this.imagesOfType.BOTTLE_SPLASH.length){
                    this.isSplashed = true;
                }
            });
        }

    }


}
