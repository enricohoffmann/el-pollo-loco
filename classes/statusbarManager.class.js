class StatusbarManager {
    constructor(colorTheme, enemies) {
        this.colorTheme = colorTheme;
        this.enemies = enemies;
        this.statusBars = [];
    }

    createNewStatusBars() {
        const statusHealthBar = new StatusBar('health', this.colorTheme);
        const statusCoinsBar = new StatusBar('coins', this.colorTheme);
        statusCoinsBar.pos_y = statusHealthBar.pos_y + 50;
        statusCoinsBar.setPercentage(0);
        const statusBottlesBar = new StatusBar('bottles', this.colorTheme);
        statusBottlesBar.pos_y = statusCoinsBar.pos_y + 50;
        statusBottlesBar.setPercentage(0);
        this.statusBars.push(statusHealthBar);
        this.statusBars.push(statusCoinsBar);
        this.statusBars.push(statusBottlesBar);
    }

    createSavedStatusBars(savedStatusBars) {
        const statusHealthBar = new StatusBar('health', savedStatusBars.find(sb => sb.type === 'health').color, savedStatusBars.find(sb => sb.type === 'health'));
        statusHealthBar.setPercentage(savedStatusBars.find(sb => sb.barType === 'health').value);
        const statusCoinsBar = new StatusBar('coins', savedStatusBars.find(sb => sb.type === 'coins').color, savedStatusBars.find(sb => sb.type === 'coins'));
        statusCoinsBar.pos_y = statusHealthBar.pos_y + 50;
        statusCoinsBar.setPercentage(savedStatusBars.find(sb => sb.barType === 'coins').value);
        const statusBottlesBar = new StatusBar('bottles', savedStatusBars.find(sb => sb.type === 'bottles').color, savedStatusBars.find(sb => sb.type === 'bottles'));
        statusBottlesBar.pos_y = statusCoinsBar.pos_y + 50;
        statusBottlesBar.setPercentage(savedStatusBars.find(sb => sb.barType === 'bottles').value);
        this.statusBars.push(statusHealthBar);
        this.statusBars.push(statusCoinsBar);
        this.statusBars.push(statusBottlesBar);
    }

    createNewEndbossHealthBar() {
        const endbossHealthBar = new StatusBar('endboss_health', this.colorTheme);

        const endboss = this.enemies.find(e => e instanceof Endboss);
        if (!endboss) return;

        endbossHealthBar.pos_x = endboss.pos_x;
        endbossHealthBar.pos_y = 45;
        endbossHealthBar.setPercentage(100);
        this.statusBars.push(endbossHealthBar);
    }

    createSavedEndBossHealthBar(savedStatusBars) {
        const endbossHealthBar = new StatusBar('endboss_health', savedStatusBars.find(sb => sb.type === 'endboss_health').color, savedStatusBars.find(sb => sb.type === 'endboss_health'));
        const endboss = this.enemies.find(e => e instanceof Endboss);
        if (!endboss) return;
        endbossHealthBar.pos_x = endboss.pos_x;
        endbossHealthBar.pos_y = 45;
        endbossHealthBar.setPercentage(savedStatusBars.find(sb => sb.type === 'endboss_health').value);
        this.statusBars.push(endbossHealthBar);
    }
}