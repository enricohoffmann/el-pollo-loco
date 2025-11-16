class Keyboard {
    constructor() {
        this.keys = {
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
            ArrowDown: false,
            " ": false
        };
    }


    setKey(key, status) {
        if (this.keys.hasOwnProperty(key)) {
            this.keys[key] = status;
        }
    }

    get jump(){
        return this.keys["ArrowUp"] || this.keys[" "];
    }

}