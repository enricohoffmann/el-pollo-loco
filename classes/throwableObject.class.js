class ThrowableObject  extends MoveableObject {



    constructor(){
        super();
        this.pos_x = 100;
        this.pos_y = 100;
        this.width = 80;
        this.height = 80;
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        
    }

    fling(x, y){
        this.pos_x = x - this.offset.right;
        this.pos_y = y;
        this.speedY = 30;
        this.applyGravity();
        
        setInterval(() => {
            this.pos_x += 10;
        }, 25);

    }

}