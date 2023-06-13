class Beach extends Phaser.Scene {
    constructor() {
        super('beachScene');
    }

    create() {
        // add sounds
        this.oceanSounds = this.sound.add('oceanBGM', {loop: true, volume: 0.5})
        this.beepEffect = this.sound.add('beep', {volume: 0.5})
        this.oceanSounds.play()

        this.add.text(centerX, centerY, 'beach scene')

    }

    update() {

    }
}