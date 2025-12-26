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
        this.statusBars.push(this.createNewEndbossHealthBar());
    }

    createSavedStatusBars(savedStatusBars) {
        const statusHealthBar = new StatusBar('health', savedStatusBars.statusBars.find(sb => sb.type === 'health').color, savedStatusBars.statusBars.find(sb => sb.type === 'health'));
        statusHealthBar.setPercentage(savedStatusBars.statusBars.find(sb => sb.type === 'health').value);
        const statusCoinsBar = new StatusBar('coins', savedStatusBars.statusBars.find(sb => sb.type === 'coins').color, savedStatusBars.statusBars.find(sb => sb.type === 'coins'));
        statusCoinsBar.pos_y = statusHealthBar.pos_y + 50;
        statusCoinsBar.setPercentage(savedStatusBars.statusBars.find(sb => sb.type === 'coins').value);
        const statusBottlesBar = new StatusBar('bottles', savedStatusBars.statusBars.find(sb => sb.type === 'bottles').color, savedStatusBars.statusBars.find(sb => sb.type === 'bottles'));
        statusBottlesBar.pos_y = statusCoinsBar.pos_y + 50;
        statusBottlesBar.setPercentage(savedStatusBars.statusBars.find(sb => sb.type === 'bottles').value);
        this.statusBars.push(statusHealthBar);
        this.statusBars.push(statusCoinsBar);
        this.statusBars.push(statusBottlesBar);
        this.statusBars.push(this.createSavedEndBossHealthBar(savedStatusBars));
    }

    createNewEndbossHealthBar() {
        const endbossHealthBar = new StatusBar('endboss_health', this.colorTheme);

        const endboss = this.enemies.find(e => e instanceof Endboss);
        if (!endboss) return;

        endbossHealthBar.pos_x = endboss.pos_x;
        endbossHealthBar.pos_y = 45;
        endbossHealthBar.setPercentage(100);
        return endbossHealthBar;
    }

    createSavedEndBossHealthBar(savedStatusBars) {
        const endbossHealthBar = new StatusBar('endboss_health', savedStatusBars.statusBars.find(sb => sb.type === 'endboss_health').color, savedStatusBars.statusBars.find(sb => sb.type === 'endboss_health'));
        const endboss = this.enemies.find(e => e instanceof Endboss);
        if (!endboss) return;
        endbossHealthBar.pos_x = endboss.pos_x;
        endbossHealthBar.pos_y = 45;
        endbossHealthBar.setPercentage(savedStatusBars.statusBars.find(sb => sb.type === 'endboss_health').value);
        return endbossHealthBar;
    }
}