class DrawableObject {
    img;
    currentImageIndex = 0;
    imageCache = {};
    pos_x = 100;
    pos_y = 120;
    height = 150;
    width = 100;
    canvas;
    end_pos_x;
    imagesOfType;

    offset = { top: 0, right: 0, bottom: 0, left: 0};

    constructor() {

    }

    loadTypeImages(imagesOfType) {
        this.imagesOfType = imagesOfType;
        for(const [key, value] of Object.entries(imagesOfType)) {
            this.loadImages(value);
        }
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx){
        ctx.drawImage(this.img, this.pos_x, this.pos_y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "blue";
            ctx.rect(this.pos_x, this.pos_y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawOffsetFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.pos_x + this.offset.left,
                this.pos_y + this.offset.top,
                this.width - this.offset.right - this.offset.left,
                this.height - this.offset.bottom - this.offset.top
            );
            ctx.stroke();
        }
    }

    getRandomObjectPosition(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.random() * (max - min) + min;
    }
}