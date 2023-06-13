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
            align: 'center',
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
        this.cjText = this.add.text(centerX, h + 50 + 25, 'C R O M W E L L  D E  G U Z M A N', creditsConfig).setOrigin(0.5)
        this.roles1 = this.add.text(centerX, h + 100 + 100, 'Production\n\nDesign\n\nProgramming\n\nWriting\n\nArt\n\nAudio', creditsConfig).setOrigin(0.5)

        // beatrice yu
        this.bebusText = this.add.text(centerX, h + 50 + 325, 'B E A T R I C E  Y U', creditsConfig).setOrigin(0.5)
        this.roles2 = this.add.text(centerX, h + 100 + 375, 'Design\n\nProgramming\n\nWriting\n\nArt', creditsConfig).setOrigin(0.5)

        // assets
        this.assetsCredits = this.add.text(centerX, h + 50 + 575, 'A S S E T S', creditsConfig).setOrigin(0.5)
        this.everything = this.add.text(centerX, h + 100 + 725, 'Adhy Savala\n\nMartha Dominguez de Gouveia\n\nArseny Togulev\n\nSean Oulashin\n\njavikolog\n\nsutemo\n\nKENNEY\n\nAshot Danielyan\n\nMaksym Dudchyk\n\nJulius H.', creditsConfig).setOrigin(0.5)

        // film credits
        this.filmCredits = this.add.text(centerX, h + 50 + 1000, 'Adapted from Blue (1993) by Derek Jarman', creditsConfig).setOrigin(0.5)
    }

    update() {
        if(this.filmCredits.y > -50) {
            this.creditsText.y--
            this.cjText.y--
            this.roles1.y--
            this.bebusText.y--
            this.roles2.y--
            this.assetsCredits.y--
            this.everything.y--
            this.filmCredits.y--
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