class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.add.text(centerX, centerY - 50, 'LOADING...')

        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()
            loadingBar.fillStyle(0xFFFFFF, 1)
            loadingBar.fillRect(0, centerY, w * value, 5)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        // load sprites
        this.load.path = './assets/art/sprites/'
        this.load.image('sanic', 'fastboy.png')
        this.load.spritesheet('player', '01-generic.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 13,
            endFrame: 13
        })
        this.load.spritesheet('doctorRed', '01-generic.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 61,
            endFrame: 61
        })
        this.load.spritesheet('nurseGreen', '01-generic.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 70,
            endFrame: 70
        })
        this.load.spritesheet('nurseYellow', '01-generic.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 67,
            endFrame: 67
        })
        
        // load tiles
        this.load.path = './assets/art/tiles/'
        this.load.image('tilesetImage1a', 'roguelikeSheet_transparent.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.image('tilesetImage1b', 'roguelikeSheet_transparent_BLUE.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.image('tilesetImage2', 'tilemap_BLUE.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.tilemapTiledJSON('waitingroomJSON', 'waitingroom.json')
        this.load.tilemapTiledJSON('hospitalJSON', 'hospital.json')
        this.load.tilemapTiledJSON('streetJSON', 'street.json')
        this.load.tilemapTiledJSON('beachJSON', 'beach.json')

        // load dialog json
        this.load.path = './assets/text/';
        this.load.json('tutorialDialog', 'tutorial.json');
    }

    create() {
        this.add.text(centerX, centerY, 'load')
        this.scene.start('menuScene')
    }
}