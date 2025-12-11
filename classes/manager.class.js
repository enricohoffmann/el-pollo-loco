class Manager {
    character;
    canvas;
    level;

    constructor() {
    }

    isRectsOverlapping(a, b, padding = 15) {
        return a.pos_x < b.pos_x + b.width + padding &&
            a.pos_x + a.width + padding > b.pos_x &&
            a.pos_y < b.pos_y + b.height + padding &&
            a.pos_y + a.height + padding > b.pos_y;
    }

    isObjectOverlapping(newObject, existingObjects){
        return existingObjects.some(o => this.isRectsOverlapping(newObject, o));
    }

}