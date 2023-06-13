class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        // add sounds
        this.oceanSounds = this.sound.add('oceanBGM', {loop: true, volume: 0.5});
        this.beepEffect = this.sound.add('beep', {volume: 0.5});
        this.oceanSounds.play();

        // add bg video
        this.video = this.add.video(centerX, centerY, 'oceanWaves').setScale(0.75).setOrigin(0.5);
        this.video.setMute(true);
        this.video.play(true);
        this.video.setPaused(false);

        this.add.text(centerX, centerY, 'BLUE', { fontSize: 50 }).setOrigin(0.5);
        this.add.text(centerX, centerY + 50, 'press space to continue').setOrigin(0.5);

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.beepEffect.play();
            this.oceanSounds.stop();
            this.scene.start('tutorialScene');
        }

        // for TA, skip to these scenes
        if (this.cursors.left.isDown) {
            // eye exam minigame
            this.scene.start('eyeExamScene'); 
        }
        if (this.cursors.right.isDown) {
            // maze minigame
            this.scene.start('hospitalScene'); 
        }
        if (this.cursors.up.isDown) {
            // endless runner minigame
            this.scene.start('drivingScene');
        }
        if (this.cursors.down.isDown) {
            // scavenger hunt minigame
            this.scene.start('beachScene');
        }
    }
}