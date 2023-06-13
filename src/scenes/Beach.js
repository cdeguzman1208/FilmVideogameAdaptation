class Beach extends Phaser.Scene {
    constructor() {
        super('beachScene');

        this.VEL = 100;
    }

    create() {
        // add sounds
        this.oceanSounds = this.sound.add('oceanBGM', {loop: true, volume: 0.5})
        this.beepEffect = this.sound.add('beep', {volume: 0.5})
        this.oceanSounds.play()

        this.add.text(centerX, centerY, 'beach scene')

        // add map
        this.map = this.add.tilemap('beachJSON');
        this.tileset = this.map.addTilesetImage('roguelikeSheet_transparent_BLUE', 'tilesetImage1b');

        // set map variables
        this.mapX = this.map.widthInPixels / 2;
        this.mapY = this.map.heightInPixels / 2;

        // add layers
        this.sandLayer = this.map.createLayer('Sand', this.tileset, 0, 0);
        this.waterLayer = this.map.createLayer('Water', this.tileset, 0, 0).setDepth(1);
        this.grassLayer = this.map.createLayer('Grass', this.tileset, 0, 0).setDepth(1);
        this.railroadLayer = this.map.createLayer('Railroad', this.tileset, 0, 0).setDepth(1);
        this.otherLayer = this.map.createLayer('Other', this.tileset, 0, 0).setDepth(1);
        this.headstoneLayer = this.map.createLayer('Headstone', this.tileset, 0, 0).setDepth(1);

        // add player
        this.player = new Player(this, this.VEL, 0, this.mapY);

        // add cameras
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // add collisions
        this.player.body.setCollideWorldBounds(true);
        this.waterLayer.setCollisionByProperty({ collides: true });
        this.grassLayer.setCollisionByProperty({ collides: true });
        this.railroadLayer.setCollisionByProperty({ collides: true });
        this.otherLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.waterLayer);
        this.physics.add.collider(this.player, this.grassLayer);
        this.physics.add.collider(this.player, this.railroadLayer);
        this.physics.add.collider(this.player, this.otherLayer);

        // headstone collision square 
        this.headstone = this.physics.add.sprite(904, 312);
        this.headstone.body.setSize(16, 16);

        // add input
        this.cursors = this.input.keyboard.createCursorKeys();
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // player & door collision
        this.physics.add.collider(this.player, this.headstone, (player, headstone) => {
            this.oceanSounds.stop()
            this.scene.start('eulogyScene');
        }, null, this)

        // player movement
        this.direction = new Phaser.Math.Vector2(0);
        if (this.cursors.left.isDown) {
            // this.player.rotation = this.player.body.angle; 
            this.direction.x = -1;
            this.player.anims.play('blueLeft', true)
        } else if (this.cursors.right.isDown) {
            // this.player.rotation = this.player.body.angle;
            this.direction.x = 1;
            this.player.anims.play('blueRight', true)
        }
        if (this.cursors.up.isDown) {
            // this.player.rotation = this.player.body.angle;
            this.direction.y = -1;
            this.player.anims.play('blueBack', true)
        } else if (this.cursors.down.isDown) {
            // this.player.rotation = this.player.body.angle;
            this.direction.y = 1;
            this.player.anims.play('blueWalk', true)
        }
        this.direction.normalize();
        this.player.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
    }
}