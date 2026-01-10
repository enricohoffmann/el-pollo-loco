/**
 * @class Keyboard
 * @description Handles keyboard and mobile button inputs for controlling character movement and actions.
 */
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

    /**
     * @description Initializes the Keyboard class and binds mobile button events.
     * @constructor
     * @memberof Keyboard
     */
    constructor() {
        this.bindMobileButtonsEvents();
    }

    /**
     * @description Binds touch and mouse events to mobile control buttons.
     * @memberof Keyboard
     * @method bindMobileButtonsEvents
     * @returns {void}
     */
    bindMobileButtonsEvents() {
        this.bindTouchButton('mobile-left-button', 'ArrowLeft');
        this.bindTouchButton('mobile-right-button', 'ArrowRight');
        this.bindTouchButton('mobile-jump-button', ' ');
        this.bindTouchButton('mobile-throw-button', 'd');
    }

    /**
     * @description Binds touch and mouse events to a specific button for a given key.
     * @memberof Keyboard
     * @method bindTouchButton
     * @param {string} buttonId 
     * @param {string} key 
     * @returns {void}
     */
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


    /**
     * @description Sets the status of a specific key.
     * @memberof Keyboard
     * @method setKey
     * @param {string} key 
     * @param {boolean} status 
     */
    setKey(key, status) {

        if (this.keys.hasOwnProperty(key)) {
            this.keys[key] = status;
        }

    }

    /**
     * @description Checks if the left movement key is pressed.
     * @memberof Keyboard
     * @method get movingLeft
     * @returns {boolean}
     */
    get jumping() {
        return this.keys[" "] || this.keys.ArrowUp;
    }

    /**
     * @description Checks if the left movement key is pressed.
     * @memberof Keyboard
     * @method get movingLeft
     * @returns {boolean}
     */
    get throwing() {
        return this.keys["d"] || this.keys["D"];
    }

    /**
     * @description Checks if no movement or action keys are pressed.
     * @memberof Keyboard
     * @method get allKeysReleased
     * @returns {boolean}
     */
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