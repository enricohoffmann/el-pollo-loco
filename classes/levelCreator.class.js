class LevelCreator {
    difficulty = 'easy';
    canvas_width;
    xPosition = 0;

    constructor(difficulty, canvas_width) {
        this.difficulty = difficulty;
        this.canvas_width = canvas_width;
    }

    createLevel() {
        if (this.difficulty === 'easy') {
            return this.createEasyLevel();
        } else if (this.difficulty === 'medium') {
            return this.createMediumLevel();
        } else if (this.difficulty === 'hard') {
            return this.createHardLevel();
        }
    }

    createEasyLevel() {
        let enemies = [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ];

        let clouds = [
            new Cloud(),
            new Cloud()
        ];

        let backgroundObjects = this.createBackgroundObjects(3);


        return new Level(enemies, clouds, backgroundObjects, this.xPosition, 10, 100);
    }

    createMediumLevel() {
        let enemies = [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ];

        let clouds = [
            new Cloud(),
            new Cloud()
        ];

        let backgroundObjects = this.createBackgroundObjects(5);


        return new Level(enemies, clouds, backgroundObjects, this.xPosition, 20, 100);
    }

    createHardLevel() {
        let enemies = [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ];

        let clouds = [
            new Cloud(),
            new Cloud()
        ];

        let backgroundObjects = this.createBackgroundObjects(8);


        return new Level(enemies, clouds, backgroundObjects, this.xPosition, 30, 100);
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
            this.xPosition += this.canvas_width - 1;
        }
        return backgroundObjects;
    }

    getOddBackgroundObjects() {
        return [
            new BackgroundObject('../img/5_background/layers/air.png', this.xPosition),
            new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', this.xPosition),
            new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', this.xPosition),
            new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', this.xPosition)
        ]
    }

    getEvenBackgroundObjects() {
        return [
            new BackgroundObject('../img/5_background/layers/air.png', this.xPosition),
            new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', this.xPosition),
            new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', this.xPosition),
            new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', this.xPosition)
        ]
    }



}