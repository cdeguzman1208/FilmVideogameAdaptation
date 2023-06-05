class Doctor extends Phaser.Scene {
    constructor() {
        super('doctorScene');
    }

    create() {
        this.add.text(centerX, centerY, '(conversation with doctor)')
    }

    update() {

    }
}