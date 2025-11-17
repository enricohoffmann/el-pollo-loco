class Cloud extends MoveableObject {
    height = 250;
    width = 500;
    pos_y = 25;
    cloudFiles = [
        '../img/5_background/layers/4_clouds/1.png',
        '../img/5_background/layers/4_clouds/2.png'
    ];
    currentCloudIndex = 0;

    constructor() {
        super();
        this.loadCloudImage();
        this.pos_x = Math.random() * 100;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.pos_x < -500) {
                this.pos_x = 720;
                this.loadCloudImage();
            }
            this.pos_x -= 0.15;
        }, 1000 / 60);
    }

    loadCloudImage() {
        this.currentCloudIndex = (this.currentCloudIndex + 1) % this.cloudFiles.length;
        this.loadImage(this.cloudFiles[this.currentCloudIndex]);
    }
        
}