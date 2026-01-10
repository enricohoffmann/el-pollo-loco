class LevelCreator {
    difficulty = 'Easy';
    canvas;
    xPosition = 0;
    currentLevel = new Level();
    levelSetting;

    constructor(canvas) {
        this.canvas = canvas;
    }

    createLevel() {
        this.readLevelSetting();
        this.create();
        this.safeCurrentLevel();
        return this.currentLevel;
    }

    readLevelSetting(){

        const config = loadGameSettings();
        this.difficulty = config.difficulty || 'Easy';

        const setting = new LevelSetting(config.countOfEnemies, config.countOfMinBottles, config.countOfMinCoins, config.gameLengthFrames, this.difficulty);
        if (this.difficulty === 'Easy') {
            this.levelSetting = setting.getEasyLevelSettings();
        } else if (this.difficulty === 'Medium') {
            this.levelSetting = setting.getMediumLevelSettings();
        } else if (this.difficulty === 'Hard') {
            this.levelSetting = setting.getHardLevelSettings();
        }
    }

    createLevelFromState() {
        const levelState = loadLevelState();
        this.currentLevel.level_end_x = levelState.level_end_x;
        this.currentLevel.damage = levelState.damage;
        this.currentLevel.health = levelState.health;
        this.currentLevel.initialBottleCount = levelState.initialBottleCount;
        this.currentLevel.bottlesOnScreen = levelState.bottlesOnScreen;
        this.currentLevel.coinsOnScreen = levelState.coinsOnScreen;
        this.difficulty = levelState.difficulty;
        this.readLevelSetting();
        this.currentLevel.backgroundObjects = this.createBackgroundObjects(this.levelSetting.contOfBackgroundObjects);
        this.currentLevel.enemies = this.createEnemysFromState(loadEnemiesState());
        this.currentLevel.clouds = this.createCloudsFromState(loadCloudsState());

        this.safeCurrentLevel();
        return this.currentLevel;
    }


    create() {
        let backgroundObjects = this.createBackgroundObjects(this.levelSetting.contOfBackgroundObjects);
        let enemies = this.createEnemys(this.levelSetting.countOfEnemies);
        let clouds = this.createClouds(this.levelSetting.countOfClouds);
        this.currentLevel.clouds = clouds;
        this.currentLevel.enemies = enemies;
        this.currentLevel.backgroundObjects = backgroundObjects;
        this.currentLevel.level_end_x = this.xPosition;
        this.currentLevel.damage = this.levelSetting.damage;
        this.currentLevel.health = this.levelSetting.initialHealth;
        this.currentLevel.initialBottleCount = this.levelSetting.initialBottleCount;
        this.currentLevel.bottlesOnScreen = this.getRandomInt(...this.levelSetting.bottlesOnScreenRange);
        this.currentLevel.coinsOnScreen = this.getRandomInt(...this.levelSetting.coinsOnScreenRange);

    }


    safeCurrentLevel() {
        const levelState = {
            level_end_x: this.currentLevel.level_end_x,
            damage: this.currentLevel.damage,
            health: this.currentLevel.health,
            initialBottleCount: this.currentLevel.initialBottleCount,
            bottlesOnScreen: this.currentLevel.bottlesOnScreen,
            coinsOnScreen: this.currentLevel.coinsOnScreen,
            difficulty: this.difficulty
        }

        safeLevelState(levelState);
        
    }


    createBackgroundObjects(countOfObjects) {
        let backgroundObjects = [];
        this.xPosition = 0;
        for (let i = 0; i < countOfObjects; i++) {
            if (i % 2 === 0){
                backgroundObjects.push(...this.getEvenBackgroundObjects());
            }  else{
                backgroundObjects.push(...this.getOddBackgroundObjects());
            }
            this.xPosition += this.canvas.width - 1;
        }
        return backgroundObjects;
    }

    getOddBackgroundObjects() {
        return [
            new BackgroundObject('../img/5_background/layers/air.png', this.xPosition, this.canvas),
            new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', this.xPosition, this.canvas),
            new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', this.xPosition, this.canvas),
            new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', this.xPosition, this.canvas)
        ]
    }

    getEvenBackgroundObjects() {
        return [
            new BackgroundObject('../img/5_background/layers/air.png', this.xPosition, this.canvas),
            new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', this.xPosition, this.canvas),
            new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', this.xPosition, this.canvas),
            new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', this.xPosition, this.canvas)
        ]
    }

    get getCurrentDifficulty() {
        return this.difficulty;
    }

    createEnemys(countOfEnemys) {
        let enemies = [];
        for (let i = 0; i < countOfEnemys; i++) {
            enemies.push(new Chicken(this.canvas, this.xPosition));
        }
        enemies.push(new Endboss(this.canvas, this.xPosition));
        return enemies;
    }

    createEnemysFromState(enemiesState) {
        let enemies = [];
        for (let enemyState of Array.isArray(enemiesState.enemies) ? enemiesState.enemies : []) {
            let enemy;
            if (enemyState.isChicken) {
                enemy = new Chicken(this.canvas, this.xPosition);
                enemy.pos_x = enemyState.pos_x;
                enemy.pos_y = enemyState.pos_y;
                enemy.energy = enemyState.energy;
            } else if (enemyState.isEndboss) {
                enemy = new Endboss(this.canvas, this.xPosition);
                enemy.pos_x = enemyState.pos_x;
                enemy.pos_y = enemyState.pos_y;
                enemy.energy = enemyState.energy;
            }
            enemies.push(enemy);
        }
        return enemies;
    }

    createClouds(countOfClouds) {
        let clouds = [];
        for (let i = 0; i < countOfClouds; i++) {
            clouds.push(new Cloud(this.canvas, this.xPosition, clouds));
        }   
        return clouds;
    }

    createCloudsFromState(cloudsState) {
        let clouds = [];
        for (let cloudState of  Array.isArray(cloudsState) ? cloudsState : []) {
            let cloud = new Cloud(this.canvas, this.xPosition, clouds);
            cloud.pos_x = cloudState.pos_x;
            cloud.pos_y = cloudState.pos_y;
            clouds.push(cloud);
        }
        return clouds;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
    }


}