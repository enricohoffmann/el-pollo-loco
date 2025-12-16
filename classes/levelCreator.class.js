class LevelCreator {
    difficulty = 'easy';
    canvas;
    xPosition = 0;
    currentLevel = new Level();

    constructor(difficulty, canvas) {
        this.difficulty = difficulty;
        this.canvas = canvas;
    }

    createLevel() {
        if (this.difficulty === 'easy') {
            return this.createEasyLevel();
        } else if (this.difficulty === 'medium') {
            //return this.createMediumLevel();
        } else if (this.difficulty === 'hard') {
            //return this.createHardLevel();
        }
    }

    createEasyLevel() {
        let backgroundObjects = this.createBackgroundObjects(3);
        let enemies = this.createEnemys(3);
        let clouds = this.createClouds(2);
        this.currentLevel.clouds = clouds;
        this.currentLevel.enemies = enemies;
        this.currentLevel.backgroundObjects = backgroundObjects;
        this.currentLevel.level_end_x = this.xPosition;
        this.currentLevel.damage = 10;
        this.currentLevel.health = 100;
        this.currentLevel.initialBottleCount = 10;
        this.currentLevel.bottlesOnScreen = this.getRandomInt(8, 15);
        this.currentLevel.coinsOnScreen = this.getRandomInt(5, 20);
        
        return this.currentLevel;
    }

    /* createMediumLevel() {
        let backgroundObjects = this.createBackgroundObjects(5);
        let enemies = this.createEnemys(5);
        let clouds = this.createClouds(2);
        return new Level(enemies, clouds, backgroundObjects, this.xPosition, 20, 100);
    } */

   /*  createHardLevel() {
        let backgroundObjects = this.createBackgroundObjects(8);
        let enemies = this.createEnemys(8);
        let clouds = this.createClouds(2);
        return new Level(enemies, clouds, backgroundObjects, this.xPosition, 30, 100, 3);
    } */


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

    createEnemys(countOfEnemys) {
        let enemies = [];
        for (let i = 0; i < countOfEnemys; i++) {
            enemies.push(new Chicken(this.canvas, this.xPosition));
        }
        enemies.push(new Endboss(this.canvas, this.xPosition));
        return enemies;
    }

    createClouds(countOfClouds) {
        let clouds = [];
        for (let i = 0; i < countOfClouds; i++) {
            clouds.push(new Cloud());
        }   
        return clouds;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
    }


}