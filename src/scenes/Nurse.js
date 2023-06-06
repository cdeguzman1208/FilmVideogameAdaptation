class Nurse extends Phaser.Scene {
    constructor() {
        super('nurseScene');
    }

    create() {
        this.add.text(centerX, centerY, 'talking to the nurse')
    }

    update() {

    }
}