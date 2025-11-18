class MoveableObject {
    pos_x = 100;
    pos_y = 120;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImageIndex = 0;
    speed = 0.15;
    otherDirection = false;

    constructor(){

    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveLeft(){
        setInterval(() => {
            this.pos_x -= this.speed;
        }, 1000 / 60);
    }

}