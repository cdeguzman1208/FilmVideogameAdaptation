class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
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
        this.load.image('player', 'tile_0119.png')
        this.load.image('npc0', 'tile_0120.png')
        this.load.image('npc1', 'tile_0121.png')
        this.load.image('npc2', 'tile_0122.png')
        this.load.image('npc3', 'tile_0123.png')
        this.load.image('npc4', 'tile_0124.png')
        this.load.image('npc5', 'tile_0125.png')

        // load tiles
        this.load.path = './assets/art/tiles/'
        this.load.image('tilesetImage', 'tilemap_packed.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.tilemapTiledJSON('hospitalJSON', 'hospital.json')

        // load dialog json
        this.load.path = './assets/text/';
        this.load.json('dialog', 'dialog.json');
    }

    create() {
        this.add.text(centerX, centerY, 'load')
        this.scene.start('menuScene')
    }
}