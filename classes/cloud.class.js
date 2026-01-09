class Cloud extends MoveableObject {
    height = 250;
    width = 500;
    pos_y = 25;
    cloudFiles = [
        '../img/5_background/layers/4_clouds/1.png',
        '../img/5_background/layers/4_clouds/2.png'
    ];
    currentCloudIndex = 0;

    constructor(canvas, end_pos_x, clouds) {
        super();
        this.canvas = canvas;
        this.clouds = clouds;
        this.end_pos_x = end_pos_x;
        this.loadCloudImage();
        this.setCloudPosition();
        this.animate();
    }

    setCloudPosition() {

        const maxAttempts = 35;
        this.pos_x = this.getRandomInt(this.canvas.width, this.end_pos_x) + 200;
        

        if(this.clouds == null || this.clouds.length === 0) return;

        let attempts = 0;
        while (this.isObjectOverlapping(this, this.clouds)) {
            this.pos_x = this.getRandomInt(this.canvas.width, this.end_pos_x) + 200;
            attempts++;
            if (attempts >= maxAttempts) {
                break;
            }
        }
    }

    animate() {
        setInterval(() => {
            if (this.pos_x < -500) {
                this.pos_x = this.end_pos_x;
                this.loadCloudImage();
            }
            this.pos_x -= 0.15;
        }, 1000 / 60);
    }

    loadCloudImage() {
        this.currentCloudIndex = Math.floor(Math.random() * this.cloudFiles.length);
        this.loadImage(this.cloudFiles[this.currentCloudIndex]);
    }


    isRectsOverlapping(a, b, padding = 15) {
        return a.pos_x < b.pos_x + b.width + padding &&
            a.pos_x + a.width + padding > b.pos_x &&
            a.pos_y < b.pos_y + b.height + padding &&
            a.pos_y + a.height + padding > b.pos_y;
    }

    isObjectOverlapping(newObject, existingObjects) {
        return existingObjects.some(o => this.isRectsOverlapping(newObject, o));
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
    }

}