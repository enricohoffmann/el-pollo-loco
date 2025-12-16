class Chicken extends MoveableObject {

    pos_y = 350;
    height = 75;
    width = 75;
    damage = 10;
    EMEMY_WALKING_IMAGES = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    ENEMY_DEAD_IMAGES = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor(canvas, level_end_x) {
        super();
        this.canvas = canvas;
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.EMEMY_WALKING_IMAGES);
        this.pos_x = this.getRandomObjectPosition(300, level_end_x - 100); 
        this.pos_y = this.canvas.height - this.height - 30;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.EMEMY_WALKING_IMAGES);
        }, 200);
    }

}