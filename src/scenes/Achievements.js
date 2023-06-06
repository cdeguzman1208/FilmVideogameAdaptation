class Achievements extends Phaser.Scene {
    constructor() {
        super('achievementScene')
    }

    create() {
        this.add.text(centerX, centerY, '(achievements)')
    }

    update() {

    }
}