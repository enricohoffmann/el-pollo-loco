class Endboss extends MoveableObject {

    height = 400;
    width = 250;
    pos_x = 700;
    pos_y = 60;
    damage = 50;
    animationInterval;
    walkingInterval;


    constructor(canvas, level_end_x) {
        super();
        this.canvas = canvas;
        this.end_pos_x = level_end_x;
        this.loadTypeImages(endbossImages);
        this.loadImage(this.imagesOfType.ENDBOSS_ALERT_IMAGES[0]);
        this.setEndbossPosition();
        this.speed = 0.15;
        this.animate();
    }

    setEndbossPosition() {
        this.pos_x = this.end_pos_x - (this.width + 80);
    }

    animate() {
        /* setInterval(() => {
            this.playAnimation(this.imagesOfType.ENDBOSS_ALERT_IMAGES);
        }, 200); */

        setTimeout(() => {
            this.walkingAnimation();
        }, 5000);

    }

    walkingAnimation() {

        this.animationInterval = setInterval(() => {
            this.playAnimation(this.imagesOfType.ENDBOSS_WALKING_IMAGES);
        }, 160);

        this.walkingInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

    }


}