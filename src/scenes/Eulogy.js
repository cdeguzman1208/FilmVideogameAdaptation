class Eulogy extends Phaser.Scene {
    constructor() {
        super('eulogyScene');
    }

    create() {
        this.add.text(centerX, centerY, '(eulogy scene)')
    }

    update() {

    }
}