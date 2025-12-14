class StatusbarManager {
    constructor(colorTheme, enemies) {
        this.colorTheme = colorTheme;
        this.enemies = enemies;
        this.statusBars = [];
        this.createStatusBar();
        this.createEndbossHealthBar();
    }

    createStatusBar() {
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


    createEndbossHealthBar() {
        const endbossHealthBar = new StatusBar('endboss_health', this.colorTheme);

        const endboss = this.enemies.find(e => e instanceof Endboss);
        if (!endboss) return;

        endbossHealthBar.pos_x = endboss.pos_x;
        endbossHealthBar.pos_y = 45;
        endbossHealthBar.setPercentage(100);
        this.statusBars.push(endbossHealthBar);
    }
}