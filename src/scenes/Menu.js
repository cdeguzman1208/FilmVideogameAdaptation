class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        // add sounds
        this.oceanSounds = this.sound.add('oceanBGM', {loop: true, volume: 0.5})
        this.beepEffect = this.sound.add('beep', {volume: 0.5})
        this.oceanSounds.play()

        this.add.text(centerX, centerY, 'BLUE', { fontSize: 30 }).setOrigin(0.5);
        this.add.text(centerX, centerY + 50, 'press space to continue').setOrigin(0.5);

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.beepEffect.play()
            this.oceanSounds.stop()
            this.scene.start('tutorialScene')
        }
        if (this.cursors.left.isDown) {
            this.scene.start('drivingScene'); 
        }
        if (this.cursors.right.isDown) {
            this.scene.start('hospitalScene'); 
        }
        if (this.cursors.up.isDown) {
            this.scene.start('eyeExamScene');
        }
        if (this.cursors.down.isDown) {
            this.scene.start('waitingRoomScene');
        }
    }
}