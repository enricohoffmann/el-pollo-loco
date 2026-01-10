/**
 * @class Level
 * @description Represents a game level with its properties and elements.
 */

class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 800;
    damage;
    health;
    initialBottleCount;
    bottlesOnScreen = 0;
    coinsOnScreen = 0;

    /**
     * @description Initializes a new instance of the Level class.
     * @constructor
     * @memberof Level
     */
    constructor() {
    }
}