class Chicken extends MoveableObject {

    pos_y = 350;
    height = 75;
    width = 75;
    EMEMY_WALKING_IMAGES = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.EMEMY_WALKING_IMAGES);
        this.pos_x = 200 + Math.random() * 500; 
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            let path = this.EMEMY_WALKING_IMAGES[this.currentImageIndex];
            this.img = this.imageCache[path];
            this.currentImageIndex ++;
            if (this.currentImageIndex >= this.EMEMY_WALKING_IMAGES.length) {
                this.currentImageIndex = 0;
            }
        }, 200);
    }

}