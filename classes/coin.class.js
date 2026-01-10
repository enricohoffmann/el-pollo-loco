/**
 * @class Coin
 * @extends DrawableObject
 * @description Represents a collectible coin in the game.
 * @property {number} width - The width of the coin.
 * @property {number} height - The height of the coin.
 * @property {string[]} coinFiles - Array of image file paths for coin animation.
 * @property {boolean} isCollected - Indicates if the coin has been collected.
 * @property {number} currentCoinIndex - Current index for coin animation frames.
 * @property {boolean} isOutOfScreen - Indicates if the coin is out of the screen.
 */
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

    /**
     * @description Creates an instance of Coin.
     * @memberof Coin
     * @constructor
     * @param {Number} canvasHeight 
     * @param {Number} levelLength 
     */
    constructor(canvasHeight, levelLength) {
        super();
        this.loadImage(this.coinFiles[1]);
        this.setPosition(canvasHeight, levelLength);
    }

    /**
     * @description Sets a random position for the coin within the game level.
     * @memberof Coin
     * @method setPosition
     * @param {Number} canvasHeight - Height of the game canvas. 
     * @param {Number} levelLength - Length of the game level.
     */
    setPosition(canvasHeight, levelLength){
        const groundLevel = canvasHeight - 200;
        const topMargin = 50;
        this.pos_y = this.getRandomObjectPosition(topMargin, groundLevel);
        this.pos_x = this.getRandomObjectPosition(250, levelLength - 500);
    }

    /**
     * @description Generates a random position within specified bounds.
     * @memberof Coin
     * @method getRandomObjectPosition
     * @param {boolean} onFinished 
     * @returns 
     */
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