class Endboss extends MoveableObject {

    height = 400;
    width = 250;
    pos_x = 700;
    pos_y = 60;
    damage = 50;


    ENDBOSS_WALKING_IMAGES = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    ENDBOSS_ALERT_IMAGES = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png"
    ];

    constructor(canvas, level_end_x) {
        super();
        this.canvas = canvas;
        this.end_pos_x = level_end_x;
        this.loadImage(this.ENDBOSS_ALERT_IMAGES[0]);
        this.loadImages(this.ENDBOSS_ALERT_IMAGES);

        this.animate();
    }

    setEndbossPosition(pos_x) {
        this.pos_x = pos_x;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_ALERT_IMAGES);
        }, 200);
    }

}