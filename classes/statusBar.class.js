/**
 * @class StatusBar
 * @description Represents a status bar in the game, such as health or energy.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {

    percentage = 100;
    barType;
    color;
    currentStatusBarKey;

    /**
     * @description Constructs a StatusBar instance with specified type and color.
     * @memberOf StatusBar
     * @constructor
     * @param {*} barType 
     * @param {*} color 
     */
    constructor(barType, color) {
        super();
        this.currentStatusBarKey = 'STATUSBAR_' + barType.toUpperCase() + '_' + color.toUpperCase();
        this.barType = barType;
        this.color = color;
        this.loadTypeImages(statusBarImages)
        this.setPercentage(100);    
        this.pos_x = 20;
        this.pos_y = 15;
        this.width = 200;
        this.height = 50;
    }

    /**
     * @description Sets the percentage value of the status bar and updates the displayed image accordingly.
     * @memberOf StatusBar
     * @method setPercentage
     * @param {number} percentage 
     */
    setPercentage(percentage){
        this.percentage = percentage;
        this.loadImage(this.imagesOfType[this.currentStatusBarKey][this.resolveImageIndex()]);
    }

    /**
     * @description Determines the image index based on the current percentage of the status bar.
     * @memberOf StatusBar
     * @method resolveImageIndex
     * @returns {number}
     */
    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;}
        else if(this.percentage >= 80){
            return 4;}
        else if(this.percentage >= 60){
            return 3;}
        else if(this.percentage >= 40){
            return 2;}
        else if(this.percentage >= 20){
            return 1;}
        else{
            return 0;}  
    }

}