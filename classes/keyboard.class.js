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
        this.bindMobileButtonsEvents();
    }


    bindMobileButtonsEvents() {
        this.bindTouchButton('mobile-left-button', 'ArrowLeft');
        this.bindTouchButton('mobile-right-button', 'ArrowRight');
        this.bindTouchButton('mobile-jump-button', ' ');
        this.bindTouchButton('mobile-throw-button', 'd');
    }

    bindTouchButton(buttonId, key) {
        const button = document.getElementById(buttonId);
        if (!button) return;

        const setKeyTrue = (e) => {
            e.preventDefault();
            this.setKey(key, true);
        }
        const setKeyFalse = (e) => {
            e.preventDefault();
            this.setKey(key, false);
        }

        button.addEventListener('touchstart', setKeyTrue);
        button.addEventListener('touchend', setKeyFalse);
        button.addEventListener('mousedown', setKeyTrue);
        button.addEventListener('mouseup', setKeyFalse);
        button.addEventListener('mouseleave', setKeyFalse);
        button.addEventListener('touchcancel', setKeyFalse);
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