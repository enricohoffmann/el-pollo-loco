class BackgroundObject extends MoveableObject {
    pos_y = 0;
    pos_x = 0;

    constructor(imgPath, pos_x, canvas) {
        super();
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.loadImage(imgPath);
        this.pos_x = pos_x;
    }
}