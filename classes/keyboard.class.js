class Keyboard {

    keys = {
        ArrowLeft: false,
        ArrowRight: false,
        ArrowUp: false,
        ArrowDown: false,
        " ": false
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


}