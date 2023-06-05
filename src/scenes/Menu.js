class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        this.add.text(centerX, centerY, 'menu').setOrigin(0.5);
        this.add.text(centerX, 150, 'press space to continue').setOrigin(0.5);

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('waitingRoomScene')
        }
    }
}