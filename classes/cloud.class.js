/**
 * @class Cloud
 * @extends MoveableObject
 * @description Represents a cloud object that moves across the screen.
 */
class Cloud extends MoveableObject {
    height = 250;
    width = 500;
    pos_y = 25;
    cloudFiles = [
        './img/5_background/layers/4_clouds/1.png',
        './img/5_background/layers/4_clouds/2.png'
    ];
    currentCloudIndex = 0;

    /**
     * @description Creates an instance of Cloud.
     * @memberOf Cloud
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas on which the cloud will be drawn.
     * @param {Number} end_pos_x - The x-coordinate representing the end position for the cloud.
     * @param {Array} clouds - An array of existing cloud objects to check for overlap.
     */
    constructor(canvas, end_pos_x, clouds) {
        super();
        this.canvas = canvas;
        this.clouds = clouds;
        this.end_pos_x = end_pos_x;
        this.loadCloudImage();
        this.setCloudPosition();
        this.animate();
    }

    /**
     * @description Sets the cloud's position, ensuring it does not overlap with existing clouds.
     * @memberOf Cloud
     * @method setCloudPosition
     * @returns {void}
     */
    setCloudPosition() {

        const maxAttempts = 35;
        this.pos_x = this.getRandomInt(this.canvas.width, this.end_pos_x) + 200;

        if(this.clouds == null || this.clouds.length === 0) return;

        let attempts = 0;
        while (this.isObjectOverlapping(this, this.clouds)) {
            this.pos_x = this.getRandomInt(this.canvas.width, this.end_pos_x) + 200;
            attempts++;
            if (attempts >= maxAttempts) {
                break;
            }
        }
    }

    /**
     * @description Animates the cloud by moving it across the screen.
     * @memberOf Cloud
     * @method animate
     * @returns {void}
     */
    animate() {
        window.createStoppableInterval(() => {
            this.cloudMouveInterval();
        }, 1000 / 60);
    }

    /**
     * @description Updates the cloud's position for each animation frame.
     * @memberOf Cloud
     * @method cloudMouveInterval
     * @returns {void}
     */
    cloudMouveInterval(){
        if(window.isGamePaused()) return;

            if (this.pos_x < -500) {
                this.pos_x = this.end_pos_x;
                this.loadCloudImage();
            }
            this.pos_x -= 0.15;
    }

    /**
     * @description Loads a random cloud image from the available cloud files.
     * @memberOf Cloud
     * @method loadCloudImage
     * @returns {void}
     */
    loadCloudImage() {
        this.currentCloudIndex = Math.floor(Math.random() * this.cloudFiles.length);
        this.loadImage(this.cloudFiles[this.currentCloudIndex]);
    }

    /**
     * @description Checks if two rectangles are overlapping with optional padding.
     * @memberOf Cloud
     * @method isRectsOverlapping
     * @param {Element} a 
     * @param {Element} b 
     * @param {Number} padding 
     * @returns {Boolean}
     */
    isRectsOverlapping(a, b, padding = 15) {
        return a.pos_x < b.pos_x + b.width + padding &&
            a.pos_x + a.width + padding > b.pos_x &&
            a.pos_y < b.pos_y + b.height + padding &&
            a.pos_y + a.height + padding > b.pos_y;
    }

    /**
     * @description Checks if a new object overlaps with any existing objects.
     * @memberOf Cloud
     * @method isObjectOverlapping
     * @param {Element} newObject 
     * @param {Array<Element>} existingObjects 
     * @returns {Boolean}
     */
    isObjectOverlapping(newObject, existingObjects) {
        return existingObjects.some(o => this.isRectsOverlapping(newObject, o));
    }

    /**
     * @description Generates a random integer between min (inclusive) and max (exclusive).
     * @memberOf Cloud
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