class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        this.add.text(centerX, centerY, 'play')
    }

    update() {

    }
}