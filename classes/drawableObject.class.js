/**
 * @class DrawableObject
 * @description This is the base class for all drawable objects in the game. It provides common properties and methods for loading images,
 *              drawing on the canvas, and handling image caching.
 * 
 */

class DrawableObject {
    img;
    currentImageIndex = 0;
    imageCache = {};
    pos_x = 100;
    pos_y = 120;
    height = 150;
    width = 100;
    canvas;
    end_pos_x;
    imagesOfType;

    offset = { top: 0, right: 0, bottom: 0, left: 0 };
    killbox = { top: 0, right: 0, bottom: 0, left: 0 };

    /**
     * @description Constructor for DrawableObject class
     * @constructor
     * @memberof DrawableObject
     */
    constructor() {

    }

    /**
     * @description Loads images of different types into the object
     * @memberof DrawableObject
     * @method loadTypeImages
     * @param {*} imagesOfType  - An object containing arrays of image paths for different types
     * @returns {void}
     */
    loadTypeImages(imagesOfType) {
        this.imagesOfType = imagesOfType;
        for (const [key, value] of Object.entries(imagesOfType)) {
            this.loadImages(value);
        }
    }

    /**
     * @description Loads a single image into the object
     * @memberof DrawableObject
     * @method loadImage
     * @param {string} path - The path to the image file
     * @returns {void} 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * @description Loads multiple images into the object's image cache
     * @memberof DrawableObject
     * @method loadImages
     * @param {Array<string>} arr - Array of image paths to load 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * @description Draws the object on the canvas
     * @memberof DrawableObject
     * @method draw
     * @param {CanvasRenderingContext2D} ctx 
     * @return {void}
     */
    draw(ctx) {
        try {
        ctx.drawImage(this.img, this.pos_x, this.pos_y, this.width, this.height);
        } catch (e) {
            return;
        }
    }

    /**
     * @description Draws the frame of the object for debugging purposes
     * @memberof DrawableObject
     * @method drawFrame
     * @param {CanvasRenderingContext2D} ctx 
     * @return {void}
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "blue";
            ctx.rect(this.pos_x, this.pos_y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * @description Draws the offset frame of the object for debugging purposes
     * @memberof DrawableObject
     * @method drawOffsetFrame
     * @param {CanvasRenderingContext2D} ctx 
     * @return {void}
     */
    drawOffsetFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.pos_x + this.offset.left,
                this.pos_y + this.offset.top,
                this.width - this.offset.right - this.offset.left,
                this.height - this.offset.bottom - this.offset.top
            );
            ctx.stroke();
        }
    }

    /**
     * @description Draws the killbox frame of the object for debugging purposes
     * @memberof DrawableObject
     * @method drawKillboxFrame
     * @param {CanvasRenderingContext2D} ctx 
     * @return {void}
     */
    drawKillboxFrame(ctx) {
        if (this instanceof Endboss || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "green";
            ctx.rect(
                this.pos_x + this.killbox.left,
                this.pos_y + this.killbox.top,
                this.width - this.killbox.right - this.killbox.left,
                this.height - this.killbox.bottom - this.killbox.top
            );
            ctx.stroke();
        }
    }

    /**
     * @description Generates a random position for the object within the specified range
     * @memberof DrawableObject
     * @method getRandomObjectPosition
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number}
     */
    getRandomObjectPosition(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.random() * (max - min) + min;
    }



}