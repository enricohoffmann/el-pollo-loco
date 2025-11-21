class Keyboard {

    keys = {
        ArrowLeft: false,
        ArrowRight: false,
        ArrowUp: false,
        ArrowDown: false,
        " ": false,
        "d": false,
        "D": false,
    };

    constructor() {

    }


    setKey(key, status) {

        if (this.keys.hasOwnProperty(key)) {
            this.keys[key] = status;
        }

    }

    get jumping() {
        return this.keys[" "] || this.keys.ArrowUp;
    }

    get throwing() {
        return this.keys["d"] || this.keys["D"];
    }

    get allKeysReleased() {
        return !this.keys.ArrowLeft &&
               !this.keys.ArrowRight &&
               !this.keys.ArrowUp &&
               !this.keys.ArrowDown &&
               !this.keys[" "] &&
               !this.keys["d"] &&
               !this.keys["D"];
    }

}