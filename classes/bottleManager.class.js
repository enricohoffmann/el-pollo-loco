class BottleManager extends Manager {
    constructor(character, statusbar, level, canvas) {
        super();
        this.bottles = [];
        this.character = character;
        this.statusbar = statusbar;
        this.level = level;
        this.canvas = canvas;
        this.totalBottles = 0;
    }

    update() {
        this.checkBottlesColisions();
    }

    checkBottlesColisions(){

    }

    handleBottleCollision(bottle){

    }

    createBottles(){
        const maxAttempts = 35;

        for (let i = 0; i < this.level.initialBottleCount; i++) {
            let attempts = 0;
            let bottle;
            do{
                bottle = new Bottle(this.canvas.height, this.level.level_end_x);
            } while(this.isObjectOverlapping(bottle, this.bottles) && attempts++ < maxAttempts);

            if(!this.isObjectOverlapping(bottle, this.bottles)){
                this.bottles.push(bottle);  
            }
        }
        this.totalBottles = this.bottles.length;
        return this.bottles;
    }
}