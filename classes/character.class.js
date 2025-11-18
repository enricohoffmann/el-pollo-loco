class Character extends MoveableObject {
    height = 320;
    width = 120;
    speed = 10;

    CHARACTER_WALKING_IMAGES = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;

    constructor(world) {
        super();
        this.world = world;
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.CHARACTER_WALKING_IMAGES);
        this.animate();
    }


    animate() {

        setInterval(() => {
            if (this.world.keyboard.keys.ArrowRight) {
                this.pos_x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.keys.ArrowLeft) {
                this.pos_x -= this.speed;
                this.otherDirection = true;
            }

            this.world.camera_x = -this.pos_x + 100;

        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.keys.ArrowRight || this.world.keyboard.keys.ArrowLeft) {
                let path = this.CHARACTER_WALKING_IMAGES[this.currentImageIndex];
                this.img = this.imageCache[path];
                this.currentImageIndex++;
                if (this.currentImageIndex >= this.CHARACTER_WALKING_IMAGES.length) {
                    this.currentImageIndex = 0;
                }
            }



        }, 40);



    }





    junmping() {

    }

}