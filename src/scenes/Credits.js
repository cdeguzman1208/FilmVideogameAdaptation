class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // add sounds
        this.oceanSounds = this.sound.add('oceanBGM', {loop: true, volume: 0.5})
        this.beepEffect = this.sound.add('beep', {volume: 0.5})
        this.oceanSounds.play()

        // define spacebar
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // credits config
        let creditsConfig = {
            fontFamily: 'Trebuchet MS',
            fontSize: '20px',
            color: 'white',
            align: 'left',
            padding: {
                top: 8,
                bottom: 8,
                left: 8,
                right: 8
            },
            fixedWidth: 0
        }

        // credits text
        this.creditsText = this.add.text(centerX, h, 'C R E D I T S', creditsConfig).setOrigin(0.5)

        creditsConfig.fontSize = '15px'

        // cromwell de guzman
        this.cjText = this.add.text(centerX, h + 50 + 25, 'Cromwell De Guzman', creditsConfig).setOrigin(0.5)
        this.roles1 = this.add.text(centerX - 25, h + 100 + 100, '- Production\n\n- Design\n\n- Programming\n\n- Writing\n\n- Art\n\n- Audio', creditsConfig).setOrigin(0.5)

        // beatrice yu
        this.bebusText = this.add.text(centerX, h + 50 + 325, 'Beatrice Yu', creditsConfig).setOrigin(0.5)
        this.roles2 = this.add.text(centerX - 25, h + 100 + 375, '- Design\n\n- Programming\n\n- Writing\n\n- Art', creditsConfig).setOrigin(0.5)
    }

    update() {
        if(this.roles2.y > -50) {
            this.creditsText.y--
            this.cjText.y--
            this.roles1.y--
            this.bebusText.y--
            this.roles2.y--
        }
        else {
            this.scene.restart()
        }

        // scene switcher
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.beepEffect.play()
            this.oceanSounds.stop()
            this.scene.start('menuScene')
        }
    }
}