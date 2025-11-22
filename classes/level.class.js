class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 800;
    damage;
    health;

    constructor(enemies, clouds, backgroundObjects, level_end_x, damage, health) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
        this.damage = damage;
        this.health = health;
    }
}