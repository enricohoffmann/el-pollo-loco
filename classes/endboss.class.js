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
    killbox = { top: 110, right: 70, bottom: 20, left: 70 };
    lastAttackTime = 0;
    isAttacking = false;
    endBossStatusBar;
    state;
    world;



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
            //this.walkingAnimation();
        }, 5000);

    }

    walkingAnimation() {

        if (this.state === 'dead') return;
        this.state = 'walk';

        clearInterval(this.attackAnimationInterval);
        clearInterval(this.hurtAnimationInterval);

        this.animationInterval = setInterval(() => {
            if (this.state !== 'walk') return;
            this.playAnimation(this.imagesOfType.ENDBOSS_WALKING_IMAGES);
        }, 160);

        this.walkingInterval = setInterval(() => {
            if (this.state !== 'walk') return;
            this.moveLeft();
            this.moveStatusBar();
            this.checkEndbossReachedLeftEdge();
        }, 1000 / 60);

    }

    checkEndbossReachedLeftEdge() {
        const leftEdgeX = this.pos_x <= 100;

        if (leftEdgeX) {
            clearInterval(this.walkingInterval);
            clearInterval(this.animationInterval);
            this.world.gameOver();
        }


    }

    moveStatusBar() {
        if (this.endBossStatusBar) {
            this.endBossStatusBar.pos_x = this.pos_x;
        }
    }

    attack() {

        if (this.state === 'dead' || this.state === 'hurt') return;
        if (this.state === 'attack') return;

        this.state = 'attack';
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
                this.attackAnimationInterval = null;

                if (this.state === "attack") {
                    this.walkingAnimation();
                }
            }
        }, 160);

    }


    hurt() {
        if (this.state === 'dead') return;
        this.state = 'hurt';
        this.lastHurtTime = new Date().getTime() + 800;

        clearInterval(this.animationInterval);
        clearInterval(this.walkingInterval);
        clearInterval(this.attackAnimationInterval);

        if (this.hurtAnimationInterval) return;

        this.hurtAnimation();
    }

    hurtAnimation() {
        this.hurtAnimationInterval = setInterval(() => {

            if (Date.now() < this.lastHurtTime && this.state === 'hurt') {
                this.playAnimation(this.imagesOfType.ENDBOSS_HURT_IMAGES);
                return;
            }

            clearInterval(this.hurtAnimationInterval);
            this.hurtAnimationInterval = null;

            if ((this.state !== 'dead')) {
                this.walkingAnimation();
            }
        }, 160);
    }

    endbossDied() {
        this.state = 'dead';
        clearInterval(this.animationInterval);
        clearInterval(this.walkingInterval);
        clearInterval(this.attackAnimationInterval);
        clearInterval(this.hurtAnimationInterval);

        this.attackAnimationInterval = null;
        this.hurtAnimationInterval = null;

        this.playAnimationOnce(this.imagesOfType.ENDBOSS_DEAD_IMAGES, () => {
            this.endBossStatusBar.pos_y = -100;
            this.pos_x = -1000;
            this.world.checkWinCondition();
        });

    }

    entbossHit() {

        this.hit();
        this.hurt();

        if (this.endBossStatusBar) {
            this.endBossStatusBar.setPercentage(this.energy);
        }

        if (this.isDead) {
            this.endbossDied();
        }
    }

}