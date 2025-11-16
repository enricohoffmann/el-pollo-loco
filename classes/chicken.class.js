class Chicken extends MoveableObject {

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.pos_x = 200 + Math.random() * 500; 
        this.height = 90;
        this.width = 80;
    }
}