class Coin extends DrawableObject {
    width = 100;
    height = 100;
    coinFiles = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(canvasHeight, levelLength) {
        super();
        this.loadImage(this.coinFiles[1]);
        this.setPosition(canvasHeight, levelLength);
    }

    setPosition(canvasHeight, levelLength){
        const groundLevel = canvasHeight - 100;
        const topMargin = 50;
        this.pos_y = this.getRandomObjectPosition(groundLevel - canvasHeight + topMargin, groundLevel);
        this.pos_x = this.getRandomObjectPosition(250, levelLength - 500);
    }
}