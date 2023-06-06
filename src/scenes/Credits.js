class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        this.add.text(centerX, centerY, '(credits)')
    }

    update() {

    }
}