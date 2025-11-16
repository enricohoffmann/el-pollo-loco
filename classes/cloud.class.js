class Cloud extends MoveableObject {
    height = 250;
    width = 500;
    pos_y = 25;


    constructor() {
        super();
        this.loadImage('../img/5_background/layers/4_clouds/1.png');
        this.pos_x = Math.random() * 100;

    }
}