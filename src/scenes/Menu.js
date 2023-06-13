class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        this.add.text(centerX, centerY, 'BLUE', { fontSize: 30 }).setOrigin(0.5);
        this.add.text(centerX, centerY + 50, 'press space to continue').setOrigin(0.5);

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('tutorialScene')
        }
        if (this.cursors.left.isDown) {
            this.scene.start('doctorScene'); 
        }
        if (this.cursors.right.isDown) {
            this.scene.start('hospitalScene'); 
        }
        if (this.cursors.up.isDown) {
            this.scene.start('eulogyScene');
        }
        if (this.cursors.down.isDown) {
            this.scene.start('waitingRoomScene');
        }
    }
}