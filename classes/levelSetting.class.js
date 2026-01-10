/**
 * @class LevelSetting
 * @extends LevelProperties
 * @classdesc This class represents the settings for a game level, extending LevelProperties. It allows configuration of enemy count, item ranges, game length, and difficulty.
 * @param {number} countOfEnemies - The number of enemies in the level.
 * @param {number} minBottles - The minimum number of bottles on screen.
 * @param {number} minCoins - The minimum number of coins on screen.
 * @param {number} gameLengthFrames - The length of the game in frames.
 * @param {string} difficulty - The difficulty level of the game (e.g., 'easy', 'medium', 'hard').
 */

class LevelSetting extends LevelProperties {

    /**
     * @description Constructs a LevelSetting instance with specified parameters or defaults based on difficulty.
     * @memberOf LevelSetting
     * @constructor
     * @param {number} countOfEnemies 
     * @param {number} minBottles 
     * @param {number} minCoins 
     * @param {number} gameLengthFrames 
     * @param {string} difficulty 
     */
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

    /**
     * @description Retrieves the level settings for easy difficulty.
     * @memberOf LevelSetting
     * @method getEasyLevelSettings
     * @returns {LevelProperties} The settings for easy difficulty level.
     */
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

    /**
     * @description Retrieves the level settings for medium difficulty.
     * @memberOf LevelSetting
     * @method getMediumLevelSettings
     * @returns {LevelProperties} The settings for medium difficulty level.
     */
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

    /**
     * @description Retrieves the level settings for hard difficulty.
     * @memberOf LevelSetting
     * @method getHardLevelSettings
     * @returns {LevelProperties} The settings for hard difficulty level.
     */
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
