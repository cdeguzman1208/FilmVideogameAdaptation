class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene');

        this.VEL = 200;
    }

    create() {
        // add map
        this.map = this.add.tilemap('waitingroomJSON')
        this.tileset = this.map.addTilesetImage('roguelikeSheet_transparent_BLUE', 'tilesetImage1b')

        // add layers
        this.background = this.map.createLayer('Floor', this.tileset, 0, 0)

        // add player
        this.player = new Player(this);

        // add cameras
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels)

        // add npcs
        this.npcGroup = this.add.group({
            runChildUpdate: true
        })
        this.npc0 = new NPC(this, 100, 100, 'npc0'); 
        this.npc1 = new NPC(this, 100, 200, 'npc1');
        this.npc2 = new NPC(this, 100, 300, 'npc2');
        this.npc3 = new NPC(this, 100, 400, 'npc3');
        this.npc4 = new NPC(this, 100, 500, 'npc4');
        this.npc5 = new NPC(this, 100, 600, 'npc5');
        this.npcGroup.add(this.npc0);
        this.npcGroup.add(this.npc1);
        this.npcGroup.add(this.npc2);
        this.npcGroup.add(this.npc3);
        this.npcGroup.add(this.npc4);
        this.npcGroup.add(this.npc5);

        // add collisions
        this.physics.add.collider(this.player, this.npcGroup);
        this.player.body.setCollideWorldBounds(true);

        // add input
        this.cursors = this.input.keyboard.createCursorKeys()
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // talking scene
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.cameras.main.stopFollow(); 
            this.scene.start('talkingScene');
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
    }
}