class StatusbarManager {
    constructor(colorTheme) {
        this.colorTheme = colorTheme;
        this.statusBars = [];
        this.createStatusBar();
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
}