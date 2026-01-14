/**
 * @class LevelCreator
 * @description Responsible for creating game levels based on difficulty settings.
 */

class LevelCreator {
    difficulty = 'Easy';
    canvas;
    xPosition = 0;
    currentLevel = new Level();
    levelSetting;
    config;

    /**
     * @description Initializes the LevelCreator with the provided canvas.
     * @constructor
     * @memberOf LevelCreator
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        this.canvas = canvas;
    }

    /**
     * @description Creates a new game level based on the current settings.
     * @memberOf LevelCreator
     * @method createLevel
     * @returns {Level}
     */
    createLevel() {
        this.readLevelSetting();
        this.create();
        this.safeCurrentLevel();
        return this.currentLevel;
    }

    /**
     * @description Reads the level settings from saved configuration or creates default settings.
     * @memberOf LevelCreator
     * @method readLevelSetting
     * @returns {void}
     */
    readLevelSetting() {
        this.config = loadGameSettings();
        if (!this.config) {
            this.createDefaultSettings();
            this.config = loadGameSettings();
        }
        this.difficulty = this.config.difficulty || 'Easy';

        const setting = new LevelSetting(this.config.countOfEnemies, this.config.countOfMinBottles, this.config.countOfMinCoins, this.config.gameLengthFrames, this.difficulty);
        if (this.difficulty === 'Easy') {
            this.levelSetting = setting.getEasyLevelSettings();
        } else if (this.difficulty === 'Medium') {
            this.levelSetting = setting.getMediumLevelSettings();
        } else if (this.difficulty === 'Hard') {
            this.levelSetting = setting.getHardLevelSettings();
        }
    }

    /**
     * @description Creates default game settings and saves them.
     * @memberOf LevelCreator
     * @method createDefaultSettings
     * @returns {Object} Default game settings.
     */
    createDefaultSettings() {
        this.config = window.defaultGameSettings;
        safeGameSettings(this.config);
    }

    /**
     * @description Creates a level based on previously saved state.
     * @memberOf LevelCreator
     * @method createLevelFromState
     * @returns {Level}
     */
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

    /**
     * @description Creates the level elements based on the level settings.
     * @memberOf LevelCreator
     * @method create
     * @returns {void}
     */
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

    /**
     * @description Saves the current level state.
     * @memberOf LevelCreator
     * @method safeCurrentLevel
     * @returns {void}
     */
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

    /**
     * @description Creates background objects for the level.
     * @memberOf LevelCreator
     * @method createBackgroundObjects
     * @param {Number} countOfObjects 
     * @returns {Array<BackgroundObject>}
     */
    createBackgroundObjects(countOfObjects) {
        let backgroundObjects = [];
        this.xPosition = 0;
        for (let i = 0; i < countOfObjects; i++) {
            if (i % 2 === 0) {
                backgroundObjects.push(...this.getEvenBackgroundObjects());
            } else {
                backgroundObjects.push(...this.getOddBackgroundObjects());
            }
            this.xPosition += this.canvas.width - 1;
        }
        return backgroundObjects;
    }

    /**
     * @description Creates background objects for odd indexed segments.
     * @memberOf LevelCreator
     * @method getOddBackgroundObjects
     * @returns {Array<BackgroundObject>}
     */
    getOddBackgroundObjects() {
        return [
            new BackgroundObject('./img/5_background/layers/air.png', this.xPosition, this.canvas),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', this.xPosition, this.canvas),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', this.xPosition, this.canvas),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', this.xPosition, this.canvas)
        ]
    }

    /**
     * @description Creates background objects for even indexed segments.
     * @memberOf LevelCreator
     * @method getEvenBackgroundObjects
     * @returns {Array<BackgroundObject>}
     */
    getEvenBackgroundObjects() {
        return [
            new BackgroundObject('./img/5_background/layers/air.png', this.xPosition, this.canvas),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', this.xPosition, this.canvas),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', this.xPosition, this.canvas),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', this.xPosition, this.canvas)
        ]
    }

    /**
     * @description Gets the current difficulty setting.
     * @memberOf LevelCreator
     * @method getCurrentDifficulty
     * @returns {String}
     */
    get getCurrentDifficulty() {
        return this.difficulty;
    }

    /**
     * @description Gets the current game settings.
     * @memberOf LevelCreator
     * @method getCurrentGameSettings
     * @returns {Object}
     */
    get getCurrentGameSettings() {
        return this.config;
    }

    /**
     * @description Creates enemies for the level.
     * @memberOf LevelCreator
     * @method createEnemys
     * @param {Number} countOfEnemys 
     * @returns {Array<Enemy>}
     */
    createEnemys(countOfEnemys) {
        let enemies = [];
        for (let i = 0; i < countOfEnemys; i++) {
            enemies.push(new Chicken(this.canvas, this.xPosition));
        }
        enemies.push(new Endboss(this.canvas, this.xPosition));
        return enemies;
    }

    /**
     * @description Creates enemies from saved state.
     * @memberOf LevelCreator
     * @method createEnemysFromState
     * @param {Object} enemiesState 
     * @returns {Array<Enemy>}
     */
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

    /**
     * @description Creates clouds for the level.
     * @memberOf LevelCreator
     * @method createClouds
     * @param {Number} countOfClouds 
     * @returns {Array<Cloud>}
     */
    createClouds(countOfClouds) {
        let clouds = [];
        for (let i = 0; i < countOfClouds; i++) {
            clouds.push(new Cloud(this.canvas, this.xPosition, clouds));
        }
        return clouds;
    }

    /**
     * @description Creates clouds from saved state.
     * @memberOf LevelCreator
     * @method createCloudsFromState
     * @param {Object} cloudsState 
     * @returns {Array<Cloud>}
     */
    createCloudsFromState(cloudsState) {
        let clouds = [];
        for (let cloudState of Array.isArray(cloudsState) ? cloudsState : []) {
            let cloud = new Cloud(this.canvas, this.xPosition, clouds);
            cloud.pos_x = cloudState.pos_x;
            cloud.pos_y = cloudState.pos_y;
            clouds.push(cloud);
        }
        return clouds;
    }

    /**
     * @description Generates a random integer between min (inclusive) and max (exclusive).
     * @memberOf LevelCreator
     * @method getRandomInt
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number}
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }


}