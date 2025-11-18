class World {

    character;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.character = new Character(this);
        
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);


        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    addToMap(mo) {

        if(mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.pos_x + mo.width, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-mo.pos_x, 0);
        }


        this.ctx.drawImage(mo.img, mo.pos_x, mo.pos_y, mo.width, mo.height);

        if(mo.otherDirection) {
            this.ctx.restore();
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }
}