class Character extends MoveableObject {
    height = 320;
    width = 150;
    speed = 10;
    damage = 2;

    CHARACTER_WALKING_IMAGES = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    CHARACTER_JUMPING_IMAGES = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    CHARACTER_DEAD_IMAGES = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    CHARACTER_HURT_IMAGES = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    world;

    constructor(world) {
        super();
        this.world = world;
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.CHARACTER_WALKING_IMAGES);
        this.loadImages(this.CHARACTER_JUMPING_IMAGES);
        this.loadImages(this.CHARACTER_DEAD_IMAGES);
        this.loadImages(this.CHARACTER_HURT_IMAGES);
        this.applyGravity();
        this.animate();
    }


    animate() {

        
        


        setInterval(() => {
            if (this.world.keyboard.keys.ArrowRight && this.pos_x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
            }

            if (this.world.keyboard.keys.ArrowLeft && this.pos_x > 100) {
                this.otherDirection = true;
                this.moveLeft();
            }

            if( this.world.keyboard.jumping && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.pos_x + 100;

        }, 1000 / 60);

        setInterval(() => {
            if(this.isDead){
                this.playAnimation(this.CHARACTER_DEAD_IMAGES);
            }else if(this.isHurt){
                this.playAnimation(this.CHARACTER_HURT_IMAGES);
            }else if(this.isAboveGround()) {
                this.playAnimation(this.CHARACTER_JUMPING_IMAGES);
            } else if (this.world.keyboard.keys.ArrowRight || this.world.keyboard.keys.ArrowLeft) {
                this.playAnimation(this.CHARACTER_WALKING_IMAGES);
            }
        }, 40);



    }


    heIsDied(){
        //See the docs for setInterval() and clearInterval().
    }



    junmping() {

    }

}