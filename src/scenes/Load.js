class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
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

        // set load path
        this.load.path = './assets/art'
    }

    create() {
    }
}