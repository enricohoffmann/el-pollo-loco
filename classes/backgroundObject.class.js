class BackgroundObject extends MoveableObject {
    width = canvasWidth;
    height = canvasHeight;
    pos_y = 0;
    pos_x = 0;

    constructor(imgPath, pos_x) {
        super();
        this.loadImage(imgPath);
        this.pos_x = pos_x;
    }
}