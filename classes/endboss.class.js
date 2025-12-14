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
    lastAttackTime = 0;
    isAttacking = false;
    endBossStatusBar;
    

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


    setEndbossPosition() {
        this.pos_x = this.end_pos_x - (this.width + 80);
        const endbossHeight = this.height - (this.offset.top + this.offset.bottom);
        const bottomMargin = 80;
        this.pos_y = this.canvas.height - (bottomMargin + endbossHeight);
    }

    animate() {
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
            this.moveStatusBar();
        }, 1000 / 60);

    }

    moveStatusBar() {
        if (this.endBossStatusBar) {
            this.endBossStatusBar.pos_x = this.pos_x;
        }
    }

    attack() {
        this.isAttacking = true;
        this.lastAttackTime = new Date().getTime();
        clearInterval(this.animationInterval);
        clearInterval(this.walkingInterval);
        this.attackAnimation();
    }

    attackAnimation() {
        this.attackAnimationInterval = setInterval(() => {
            this.playAnimation(this.imagesOfType.ENDBOSS_ATTACK_IMAGES);
            const attackDuration = new Date().getTime() - this.lastAttackTime;
            if (attackDuration >= 3000) {
                this.isAttacking = false;
                this.lastAttackTime = 0;
                clearInterval(this.attackAnimationInterval);
                this.walkingAnimation();
            }
        }, 160);

    }

    endbossDied() {
        clearInterval(this.animationInterval);
        clearInterval(this.walkingInterval);
        clearInterval(this.attackAnimationInterval);    
        this.playAnimationOnce(this.imagesOfType.ENDBOSS_DEAD_IMAGES, () => {
            this.endBossStatusBar.pos_y = -100;
            this.pos_x = -1000;
        });
    
    }   

}