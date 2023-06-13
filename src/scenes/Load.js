class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.add.text(centerX, centerY - 25, 'LOADING...').setOrigin(0.5)
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
        this.load.image('car', 'car_orange_blue.png')
        this.load.image('pill', 'bluepill.png')
        this.load.image('blueModel', 'blue.png')
        this.load.image('redModel', 'doctor red.png')
        this.load.image('greenModel', 'nurse green.png')
        this.load.image('yellowModel', 'nurse yellow.png')
        this.load.spritesheet('sprites', '01-generic.png', {
            frameWidth: 16, 
            frameHeight: 16, 
            startFrame: 0, 
            endFrame: 119
        })
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
        this.load.spritesheet('darkBlue', '01-generic.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 1,
            endFrame: 1
        })
        this.load.spritesheet('brown', '01-generic.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 4,
            endFrame: 4
        })
        this.load.spritesheet('pink', '01-generic.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 7,
            endFrame: 7
        })
        this.load.spritesheet('whiteBlue', '01-generic.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 10,
            endFrame: 10
        })
        this.load.spritesheet('purple', '01-generic.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 64,
            endFrame: 64
        })
        this.load.spritesheet('white', '01-generic.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 73,
            endFrame: 73
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

        // load backgrounds
        this.load.path = './assets/art/backgrounds/'
        this.load.image('inPatientRoomBG', 'beds.jpg')
        this.load.image('waitingRoomBG', 'desk.jpg')
        this.load.image('beachBG', 'ocean.jpg')
        this.load.image('doctorsOfficeBG', 'table.jpg')

        // load dialog json
        this.load.path = './assets/text/'
        this.load.json('tutorialDialog', 'tutorial.json')
        this.load.json('doctorDialog', 'doctor.json')
        this.load.json('nurseDialog', 'nurse.json')
        this.load.json('graveDialog', 'gravestone.json')

        // load music
        this.load.path = './assets/sound/music/'
        this.load.audio('sadgeBGM', 'emotional-thoughtful-piano-141580.mp3')
        this.load.audio('intenseBGM', 'epic-background-music-for-short-vlog-videos-26-seconds-149394.mp3')
        this.load.audio('oceanBGM', 'waves-and-tears-sad-piano-music-with-calm-ocean-waves-8164.mp3')

        // load sfx
        this.load.path = './assets/sound/sfx/'
        this.load.audio('honk', 'assets_car_horn.mp3')
        this.load.audio('beep', 'blipSelect.wav')

        // load video
        this.load.path = './assets/videos/'
        this.load.video('')
    }

    create() {
        // animations 
        // blue
        this.anims.create({
            key: 'blueWalk', 
            frames: [
                {key: 'sprites', frame: 12}, 
                {key: 'sprites', frame: 14}
            ],
            frameRate: 2, 
            repeat: -1
        });
        this.anims.create({
            key: 'blueLeft', 
            frames: [
                {key: 'sprites', frame: 27}, 
                {key: 'sprites', frame: 29}
            ],
            frameRate: 2, 
            repeat: -1
        });
        this.anims.create({
            key: 'blueRight', 
            frames: [
                {key: 'sprites', frame: 42}, 
                {key: 'sprites', frame: 44}
            ],
            frameRate: 2, 
            repeat: -1
        });
        this.anims.create({
            key: 'blueBack', 
            frames: [
                {key: 'sprites', frame: 57}, 
                {key: 'sprites', frame: 59}
            ],
            frameRate: 2, 
            repeat: -1
        });
        // red
        this.anims.create({
            key: 'redBack', 
            frames: [
                {key: 'sprites', frame: 105}, 
                {key: 'sprites', frame: 107}
            ],
            frameRate: 2, 
            repeat: -1
        });
        // yellow
        this.anims.create({
            key: 'yellowBack', 
            frames: [
                {key: 'sprites', frame: 111}, 
                {key: 'sprites', frame: 113}
            ],
            frameRate: 2, 
            repeat: -1
        });
        // dark blue
        this.anims.create({
            key: 'darkblueBack', 
            frames: [
                {key: 'sprites', frame: 45}, 
                {key: 'sprites', frame: 47}
            ],
            frameRate: 2, 
            repeat: -1
        });
        // brown
        this.anims.create({
            key: 'brownBack', 
            frames: [
                {key: 'sprites', frame: 48}, 
                {key: 'sprites', frame: 50}
            ],
            frameRate: 2, 
            repeat: -1
        });
        // pink
        this.anims.create({
            key: 'pinkBack', 
            frames: [
                {key: 'sprites', frame: 51}, 
                {key: 'sprites', frame: 53}
            ],
            frameRate: 2, 
            repeat: -1
        });
        // white blue
        this.anims.create({
            key: 'whiteblueBack', 
            frames: [
                {key: 'sprites', frame: 54}, 
                {key: 'sprites', frame: 56}
            ],
            frameRate: 2, 
            repeat: -1
        });
        // purple
        this.anims.create({
            key: 'purpleBack', 
            frames: [
                {key: 'sprites', frame: 108}, 
                {key: 'sprites', frame: 110}
            ],
            frameRate: 2, 
            repeat: -1
        });
        // white
        this.anims.create({
            key: 'whiteBack', 
            frames: [
                {key: 'sprites', frame: 117}, 
                {key: 'sprites', frame: 119}
            ],
            frameRate: 2, 
            repeat: -1
        });

        this.scene.start('menuScene')
    }
}