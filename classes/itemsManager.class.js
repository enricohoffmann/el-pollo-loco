/**
 * @class ItemsManager
 * @description Manages collectible items within the game, including their creation, collision detection with the character, and updating the status bar.
 */

class ItemsManager {
    character;
    canvas;
    level;
    collectedItems = 0;
    totalItems = 0;
    statusBar;
    items = [];

    /**
     * @description Creates an instance of ItemsManager.
     * @memberof ItemsManager
     * @constructor
     * @param {Character} character 
     * @param {StatusBar} statusBar 
     * @param {Number} level 
     * @param {HTMLCanvasElement} canvas 
     * @param {AudioManager} audioManager 
     */
    constructor(character, statusBar, level, canvas, audioManager) {
        this.character = character;
        this.statusBar = statusBar;
        this.level = level;
        this.canvas = canvas;
        this.audioManager = audioManager;
    }

    /**
     * @description Updates the items manager, checking for item collisions.
     * @memberof ItemsManager
     * @returns {void}
     */
    update() {
        this.checkItemsColisions();
    }

    /**
     * @description Checks if two rectangles are overlapping with optional padding.
     * @memberof ItemsManager
     * @method isRectsOverlapping
     * @param {Item} a 
     * @param {Item} b 
     * @param {Number} padding 
     * @returns {Boolean} True if rectangles overlap, false otherwise.
     */
    isRectsOverlapping(a, b, padding = 15) {
        return a.pos_x < b.pos_x + b.width + padding &&
            a.pos_x + a.width + padding > b.pos_x &&
            a.pos_y < b.pos_y + b.height + padding &&
            a.pos_y + a.height + padding > b.pos_y;
    }

    /**
     * @description Checks if a new object overlaps with any existing objects.
     * @memberof ItemsManager
     * @method isObjectOverlapping
     * @param {Element} newObject 
     * @param {Array<Element>} existingObjects 
     * @returns {Boolean} True if the new object overlaps with any existing objects, false otherwise.
     */
    isObjectOverlapping(newObject, existingObjects){
        return existingObjects.some(o => this.isRectsOverlapping(newObject, o));
    }

    /**
     * @description Checks for collisions between the character and items, handling collected items.
     * @memberof ItemsManager
     * @method checkItemsColisions
     * @returns {void}
     */
    checkItemsColisions(){
        if(!this.items || this.items.length === 0) return;

        const collectedItem = this.items.find(item => this.character.isColliding(item));

        if(!collectedItem || collectedItem.isCollected) return;
        collectedItem.isCollected = true;
        this.collectedItems++;

        if(collectedItem instanceof Coin) {
            this.audioManager.playSoundEffect('../audio/get-coin.mp3');
        }

        if(collectedItem instanceof Bottle) {
            this.audioManager.playSoundEffect('../audio/get-bottle.mp3');
        }

        collectedItem.animateCollectet(() => {
            this.handleCollectedItem(collectedItem);
        });
    }

    /**
     * @description Handles the logic when an item is collected.
     * @memberof ItemsManager
     * @method handleCollectedItem
     * @param {Item} item 
     * @returns {void}
     */
    handleCollectedItem(item){
        item.isOutOfScreen = true;
        this.setStatusBarPercentage();
    }

    /**
     * @description Updates the status bar percentage based on collected items.
     * @memberof ItemsManager
     * @method setStatusBarPercentage
     * @returns {void}
     */
    setStatusBarPercentage(){
        const percent = Math.round((this.collectedItems / this.totalItems) * 100);
        this.statusBar.setPercentage(percent);
    }

    /**
     * @description Creates new items using a factory method, ensuring no overlaps.
     * @memberof ItemsManager
     * @method createNewItems
     * @param {Function} factoryMethod 
     * @param {Number} itemCount 
     * @returns {Array} The array of created items.
     */
    createNewItems(factoryMethod, itemCount){
        const maxAttempts = 35;

        for (let i = 0; i < itemCount; i++) {
            let attempts = 0;
            let item;
            do{
                item = factoryMethod(this.canvas.height, this.level.level_end_x);
            } while(this.isObjectOverlapping(item, this.items) && attempts++ < maxAttempts);

            if(!this.isObjectOverlapping(item, this.items)){
                this.items.push(item);
            }   
        }

        this.totalItems = this.items.length;
        return this.items;
    }

    /**
     * @description Creates items from saved data.
     * @memberof ItemsManager
     * @method createSavedItems
     * @param {} savedItemsData - The saved items data.
     * @param {} itemsArray - The array of item data to recreate items from.
     * @param {Function} factoryMethod 
     * @returns {Array} The array of created items.
     */
    createSavedItems(savedItemsData, itemsArray, factoryMethod){
        this.collectedItems = savedItemsData.collectedItems;
        this.totalItems = savedItemsData.totalItems;
        this.setStatusBarPercentage();

        this.items = itemsArray.map(data => {
            const item = factoryMethod(0, 0, data.bottleImageIndex);
            item.isCollected = data.isCollected;
            item.pos_x = data.pos_x;
            item.pos_y = data.pos_y;
            item.isOutOfScreen = data.out;
            item.isCollected = data.isCollected;
            return item;
        });

        return this.items;
    }

}