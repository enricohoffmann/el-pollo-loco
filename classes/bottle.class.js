class Bottle extends DrawableObject {
    width = 60;
    height = 80;
    bottleFiles = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    isCollected = false;
    currentBottleIndex = 0;
    isOutOfScreen = false;

    constructor(canvasHeight, levelLength) {
        super();
        const index = Math.floor(Math.random() * this.bottleFiles.length);
        this.loadImage(this.bottleFiles[index]);
        this.setPosition(canvasHeight, levelLength);
    }

    setPosition(canvasHeight, levelLength){
        const groundLevel = canvasHeight - 110;
        this.pos_y = groundLevel;
        this.pos_x = this.getRandomObjectPosition(250, levelLength - 500);
    }
}