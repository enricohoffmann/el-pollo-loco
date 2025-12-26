class ItemsManager {
    character;
    canvas;
    level;
    collectedItems = 0;
    totalItems = 0;
    statusBar;
    items = [];

    constructor(character, statusBar, level, canvas) {
        this.character = character;
        this.statusBar = statusBar;
        this.level = level;
        this.canvas = canvas;
    }

    update() {
        this.checkItemsColisions();
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


    checkItemsColisions(){
        if(!this.items || this.items.length === 0) return;

        const collectedItem = this.items.find(item => this.character.isColliding(item));

        if(!collectedItem || collectedItem.isCollected) return;
        collectedItem.isCollected = true;
        this.collectedItems++;

        collectedItem.animateCollectet(() => {
            this.handleCollectedItem(collectedItem);
        });
    }


    handleCollectedItem(item){
        item.isOutOfScreen = true;
        this.setStatusBarPercentage();
    }

    setStatusBarPercentage(){
        const percent = Math.round((this.collectedItems / this.totalItems) * 100);
        this.statusBar.setPercentage(percent);
    }

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

    createSavedItems(savedItemsData, itemsArray, factoryMethod){
        this.collectedItems = savedItemsData.collectedItems;
        this.totalItems = savedItemsData.totalItems;
        this.setStatusBarPercentage();

        this.items = itemsArray.map(data => {
            const item = factoryMethod(0, 0);
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