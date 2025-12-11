class CoinManager  extends Manager {
    constructor(character, statusBar, level, canvas) {
        super();
        this.coins = [];
        this.character = character;
        this.statusBar = statusBar;
        this.collectedCoins = 0;
        this.totalCoins = this.coins.length;
        this.level = level;
        this.canvas = canvas;
    }

    update() {
        this.checkCoinsColisions();
    }

    checkCoinsColisions(){
        if(this.coins.length <= 0) return;

        const collectedCoin = this.coins.find(coin => this.character.isColliding(coin));

        if(!collectedCoin || collectedCoin.isCollected) return;

        collectedCoin.isCollected = true;

        collectedCoin.animateCollectet(() => {
            this.handleCollectedCoin(collectedCoin);
        });
    }

    handleCollectedCoin(coin){
        this.collectedCoins++;
        coin.isOutOfScreen = true;
        const percent = Math.round((this.collectedCoins / this.totalCoins) * 100);
        this.statusBar.setPercentage(percent);
    }

    createCoins() {

        const maxAttempts = 35;
       
        for (let i = 0; i < this.level.coinsOnScreen; i++) {

            let attempts = 0;
            let coin;

            do{
                coin = new Coin(this.canvas.height, this.level.level_end_x);
            } while(this.isObjectOverlapping(coin, this.coins) && attempts++ < maxAttempts);

            if(!this.isObjectOverlapping(coin, this.coins)){
                this.coins.push(coin);
            } else {
                console.log(`Could not place coin ${i + 1} after ${maxAttempts} attempts, skipping.`);
            }
           
        }

        return this.coins;
    }

}