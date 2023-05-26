class Levels extends Phaser.Scene {
    constructor() {
        super('LevelSelectScene')
    }

    create() {
        this.add.text(centerX, centerY, 'levels')
    }

    update() {

    }
}