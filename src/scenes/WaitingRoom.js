class WaitingRoom extends Phaser.Scene {
    constructor() {
        super('waitingRoomScene');

        this.VEL = 100;
    }

    create() {
        // add map
        this.map = this.add.tilemap('waitingroomJSON')
        this.tileset = this.map.addTilesetImage('roguelikeSheet_transparent', 'tilesetImage1a')

        // set map variables
        this.mapX = this.map.widthInPixels / 2
        this.mapY = this.map.heightInPixels / 2

        // add layers
        this.floorLayer = this.map.createLayer('Floor', this.tileset, 0, 0)
        this.wallLayer = this.map.createLayer('Wall', this.tileset, 0, 0).setDepth(1)
        this.furnitureLayer = this.map.createLayer('Furniture', this.tileset, 0, 0).setDepth(1)
        this.decorLayer = this.map.createLayer('Decor', this.tileset, 0, 0).setDepth(1)
        this.doorLayer = this.map.createLayer('Door', this.tileset, 0, 0).setDepth(1)

        // add player
        this.player = new Player(this, this.VEL, this.mapX, this.mapY - 55);

        // add cameras
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels)

        // add npcs
        this.npcGroup = this.add.group({
            runChildUpdate: true
        })
        this.npc0 = new NPC(this, this.mapX + 95, this.mapY + 30, 'doctorRed'); 
        this.npc1 = new NPC(this, this.mapX, this.mapY - 85, 'nurseGreen');
        this.npc2 = new NPC(this, this.mapX + 95, this.mapY - 30, 'nurseYellow');
        this.npcGroup.add(this.npc0);
        this.npcGroup.add(this.npc1);
        this.npcGroup.add(this.npc2);

        // add collisions
        this.player.body.setCollideWorldBounds(true)
        this.wallLayer.setCollisionByProperty({ collides: true })
        this.furnitureLayer.setCollisionByProperty({ collides: true })
        this.decorLayer.setCollisionByProperty({ collides: true })
        this.doorLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(this.player, this.npcGroup)
        this.physics.add.collider(this.player, this.wallLayer)
        this.physics.add.collider(this.player, this.furnitureLayer)
        this.physics.add.collider(this.player, this.decorLayer)
        this.physics.add.collider(this.player, this.doorLayer)

        // add input
        this.cursors = this.input.keyboard.createCursorKeys()
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // talking scene
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.cameras.main.stopFollow();
            this.scene.start('eyeExamScene');
        }

        // player movement
        this.direction = new Phaser.Math.Vector2(0);
        if(this.cursors.left.isDown) {
            // this.player.rotation = this.player.body.angle; 
            this.direction.x = -1;
        } else if(this.cursors.right.isDown) {
            // this.player.rotation = this.player.body.angle;
            this.direction.x = 1;
        }
        if(this.cursors.up.isDown) {
            // this.player.rotation = this.player.body.angle;
            this.direction.y = -1;
        } else if(this.cursors.down.isDown) {
            // this.player.rotation = this.player.body.angle;
            this.direction.y = 1;
        }
        this.direction.normalize();
        this.player.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);

        this.npc0.y--
        this.npc2.y--
        if(this.npc0.y < this.mapY - 125) {
            this.npc0.destroy()
        }
        if(this.npc2.y < this.mapY - 125) {
            this.npc2.destroy()
        }
    }
}