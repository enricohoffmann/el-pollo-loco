class LevelSetting extends LevelProperties {


    constructor(){
        super();
    }


    getEasyLevelSettings(){

        const easySettings = new LevelProperties();
        easySettings.damage = 10;
        easySettings.initialHealth = 100;
        easySettings.initialBottleCount = 10;
        easySettings.bottlesOnScreenRange = [8, 15];
        easySettings.coinsOnScreenRange = [5, 20];
        easySettings.contOfBackgroundObjects = 3;
        easySettings.countOfEnemies = 3;
        easySettings.countOfClouds = 2;
        return easySettings;
    }


    getMediumLevelSettings(){
        const mediumSettings = new LevelProperties();
        mediumSettings.damage = 20;
        mediumSettings.initialHealth = 100;
        mediumSettings.initialBottleCount = 7;
        mediumSettings.bottlesOnScreenRange = [5, 10];
        mediumSettings.coinsOnScreenRange = [10, 25];
        mediumSettings.contOfBackgroundObjects = 5;
        mediumSettings.countOfEnemies = 5;
        mediumSettings.countOfClouds = 2;
        return mediumSettings;
    }

    getHardLevelSettings(){
        const hardSettings = new LevelProperties();
        hardSettings.damage = 30;
        hardSettings.initialHealth = 100;
        hardSettings.initialBottleCount = 5;
        hardSettings.bottlesOnScreenRange = [3, 8];
        hardSettings.coinsOnScreenRange = [15, 30];
        hardSettings.contOfBackgroundObjects = 8;
        hardSettings.countOfEnemies = 8;
        hardSettings.countOfClouds = 2;
        return hardSettings;
    }

    getCustomLevelSettings(damage, initialHealth, initialBottleCount, bottlesOnScreenRange, coinsOnScreenRange, contOfBackgroundObjects, countOfEnemies, countOfClouds){
        const customSettings = new LevelProperties();
        customSettings.damage = damage;
        customSettings.initialHealth = initialHealth;
        customSettings.initialBottleCount = initialBottleCount;
        customSettings.bottlesOnScreenRange = bottlesOnScreenRange;
        customSettings.coinsOnScreenRange = coinsOnScreenRange;
        customSettings.contOfBackgroundObjects = contOfBackgroundObjects;
        customSettings.countOfEnemies = countOfEnemies;
        customSettings.countOfClouds = countOfClouds;
        return customSettings;
    }

}
