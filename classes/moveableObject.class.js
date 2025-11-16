class MoveableObject {
    pos_x = 100;
    pos_y = 250;
    img;
    height = 150;
    width = 100;

    constructor(){

    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(){
        
    }

    moveLeft(){

    }

}