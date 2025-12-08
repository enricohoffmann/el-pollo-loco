class StatusBar extends DrawableObject {

    percentage = 100;
    barType;
    color;
    currentStatusBarKey;

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




    setPercentage(percentage){
        this.percentage = percentage;
        this.loadImage(this.imagesOfType[this.currentStatusBarKey][this.resolveImageIndex()]);
    }


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