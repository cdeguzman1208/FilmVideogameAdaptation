class Hospital extends Phaser.Scene {
    constructor() {
        super('hospitalScene');

        this.VEL = 150; 
    }

    create() {
        // add map
        this.map = this.add.tilemap('hospitalJSON')
        this.tileset = this.map.addTilesetImage('roguelikeSheet_transparent_BLUE', 'tilesetImage1b')

        // set map variables
        this.mapX = this.map.widthInPixels / 2
        this.mapY = this.map.heightInPixels / 2

        // add layers
        this.floorLayer = this.map.createLayer('Floor', this.tileset, 0, 0)
        this.wallLayer = this.map.createLayer('Wall', this.tileset, 0, 0)

        // add player
        this.player = new Player(this, this.VEL, 176, this.mapY - 16);

        // add collisions
        this.player.body.setCollideWorldBounds(true)
        this.physics.world.bounds.setTo(160, 144, 640, 336)
        this.wallLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(this.player, this.wallLayer)

        // maze end collision square 
        this.s = this.physics.add.sprite(792, 432).setOrigin(0);
        this.s.body.setSize(32, 32);

        // input
        this.cursors = this.input.keyboard.createCursorKeys();

        // blue text screen
        this.blue = this.add.rectangle(0, 0, 480, 320, 0x002199).setOrigin(0); 
        this.t1 = this.add.text(240, 100, 'The road to the city of Aqua Vitae is \nprotected by a labyrinth', {align: 'center'}).setOrigin(0.5); 
        this.t2 = this.add.text(240, 150, 'Built from crystals and mirrors, which \nin the sunlight,', {align: 'center'}).setOrigin(0.5); 
        this.t3 = this.add.text(240, 200, 'Causes terrible blindness...').setOrigin(0.5); 
        this.t4 = this.add.text(240, 250, '[SPACE]').setOrigin(0.5);
        this.b = true; 
    }

    update() {
        // destroy blue text screen
        if (this.b == true) {
            if (this.cursors.space.isDown) {
                this.blue.destroy(); 
                this.t1.destroy(); 
                this.t2.destroy(); 
                this.t3.destroy(); 
                this.t4.destroy(); 
                this.b = false; 

                this.wallLayer.setDepth(1); 
                this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
                this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
            }
        }

        // player movement
        this.direction = new Phaser.Math.Vector2(0);
        if (this.cursors.left.isDown) {
            this.direction.x = -1;
        } else if (this.cursors.right.isDown) {
            this.direction.x = 1;
        }
        if (this.cursors.up.isDown) {
            this.direction.y = -1;
        } else if (this.cursors.down.isDown) {
            this.direction.y = 1;
        }
        this.direction.normalize();
        this.player.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);

        // player door collision
        this.physics.add.collider(this.player, this.s, (player, door) => {
            this.scene.start('nurseScene'); 
        }, null, this)
    }
}