/**
 * @class BackgroundObject
 * @extends MoveableObject
 * @description Represents a background object in the game that moves with the camera.
 */

class BackgroundObject extends MoveableObject {
    pos_y = 0;
    pos_x = 0;

    /**
     * @description Creates a new BackgroundObject.
     * @memberOf BackgroundObject
     * @constructor
     * @param {string} imgPath - The path to the image file.
     * @param {Number} pos_x - The x position of the background object.
     * @param {HTMLCanvasElement} canvas - The canvas on which the background object is drawn.
     */
    constructor(imgPath, pos_x, canvas) {
        super();
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.loadImage(imgPath);
        this.pos_x = pos_x;
    }
}