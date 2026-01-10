class LevelSetting extends LevelProperties {


    constructor(countOfEnemies, minBottles, minCoins, gameLengthFrames, difficulty) {
        super();
        this.countOfEnemies = countOfEnemies;
        const minBottlesInt = minBottles || difficultySettings[difficulty].countOfMinBottles;
        const minCoinsInt = minCoins || difficultySettings[difficulty].countOfMinCoins;
        this.bottlesOnScreenRange = [minBottlesInt, minBottlesInt + 5];
        this.coinsOnScreenRange = [minCoinsInt, minCoinsInt + 10];
        this.gameLengthFrames = gameLengthFrames || difficultySettings[difficulty].gameLengthFrames;
        this.difficulty = difficulty;
    }


    getEasyLevelSettings(){

        const easySettings = new LevelProperties();
        easySettings.damage = 5;
        easySettings.initialHealth = 100;
        easySettings.initialBottleCount = 10;
        easySettings.bottlesOnScreenRange = this.bottlesOnScreenRange;
        easySettings.coinsOnScreenRange = this.coinsOnScreenRange;
        easySettings.contOfBackgroundObjects = this.gameLengthFrames;
        easySettings.countOfEnemies = this.countOfEnemies;
        easySettings.countOfClouds = 2;
        return easySettings;
    }


    getMediumLevelSettings(){
        const mediumSettings = new LevelProperties();
        mediumSettings.damage = 20;
        mediumSettings.initialHealth = 100;
        mediumSettings.initialBottleCount = 7;
        mediumSettings.bottlesOnScreenRange = this.bottlesOnScreenRange;
        mediumSettings.coinsOnScreenRange = this.coinsOnScreenRange;
        mediumSettings.contOfBackgroundObjects = this.gameLengthFrames;
        mediumSettings.countOfEnemies = this.countOfEnemies;
        mediumSettings.countOfClouds = 2;
        return mediumSettings;
    }

    getHardLevelSettings(){
        const hardSettings = new LevelProperties();
        hardSettings.damage = 30;
        hardSettings.initialHealth = 100;
        hardSettings.initialBottleCount = 5;
        hardSettings.bottlesOnScreenRange = this.bottlesOnScreenRange;
        hardSettings.coinsOnScreenRange = this.coinsOnScreenRange;
        hardSettings.contOfBackgroundObjects = this.gameLengthFrames;
        hardSettings.countOfEnemies = this.countOfEnemies;
        hardSettings.countOfClouds = 2;
        return hardSettings;
    }

}
