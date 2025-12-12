class Coin extends DrawableObject {
    width = 100;
    height = 100;
    coinFiles = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];
    isCollected = false;
    currentCoinIndex = 0;
    isOutOfScreen = false;

    constructor(canvasHeight, levelLength) {
        super();
        this.loadImage(this.coinFiles[1]);
        this.setPosition(canvasHeight, levelLength);
    }

    setPosition(canvasHeight, levelLength){
        const groundLevel = canvasHeight - 200;
        const topMargin = 50;
        this.pos_y = this.getRandomObjectPosition(topMargin, groundLevel);
        this.pos_x = this.getRandomObjectPosition(250, levelLength - 500);
    }


    animateCollectet(onFinished){
        if(this.pos_y < -20){
            if(onFinished){
                onFinished();
            }

            return;
        }

        this.currentCoinIndex = (this.currentCoinIndex + 1) % this.coinFiles.length;
        this.loadImage(this.coinFiles[this.currentCoinIndex]);
        this.pos_y -= 5;

        const animationFrameTime = 25;

        setTimeout(()=>{
            this.animateCollectet(onFinished);
        }, animationFrameTime);
    }

}