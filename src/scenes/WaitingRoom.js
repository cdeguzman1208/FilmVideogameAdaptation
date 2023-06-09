class WaitingRoom extends Phaser.Scene {
    constructor() {
        super('waitingRoomScene');

        this.VEL = 100;
    }

    create() {
        this.done = false;

        // add sounds
        this.sadSounds = this.sound.add('sadgeBGM', {loop: true, volume: 0.5});
        this.beepEffect = this.sound.add('beep', {volume: 0.5});
        this.sadSounds.play();
        
        // add map
        this.map = this.add.tilemap('waitingroomJSON');
        this.tileset = this.map.addTilesetImage('roguelikeSheet_transparent', 'tilesetImage1a');

        // set map variables
        this.mapX = this.map.widthInPixels / 2;
        this.mapY = this.map.heightInPixels / 2;

        // add layers
        this.floorLayer = this.map.createLayer('Floor', this.tileset, 0, 0);
        this.wallLayer = this.map.createLayer('Wall', this.tileset, 0, 0).setDepth(1);
        this.furnitureLayer = this.map.createLayer('Furniture', this.tileset, 0, 0).setDepth(1);
        this.decorLayer = this.map.createLayer('Decor', this.tileset, 0, 0).setDepth(1);
        this.doorLayer = this.map.createLayer('Door', this.tileset, 0, 0).setDepth(1);

        // add player
        this.player = new Player(this, this.VEL, this.mapX, this.mapY - 55);

        // add cameras
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(336, 208, 288, 256);


        // set up Obstacle group
        this.npcGroup = this.add.group({
            runChildUpdate: true
        });

        // add npcs
        this.npc0 = new NPC(this, this.mapX + 95, this.mapY + 30, 'doctorRed'); 
        this.npc1 = new NPC(this, this.mapX, this.mapY - 85, 'nurseGreen');
        this.npc2 = new NPC(this, this.mapX + 95, this.mapY - 30, 'nurseYellow');
        this.npc3 = new NPC(this, this.mapX + 95, this.mapY + 90, 'darkBlue'); 
        this.npc4 = new NPC(this, this.mapX + 95, this.mapY + 150, 'brown'); 
        this.npc5 = new NPC(this, this.mapX + 95, this.mapY + 210, 'pink'); 
        this.npc6 = new NPC(this, this.mapX + 95, this.mapY + 270, 'whiteBlue'); 
        this.npc7 = new NPC(this, this.mapX + 95, this.mapY + 330, 'purple'); 
        this.npc8 = new NPC(this, this.mapX + 95, this.mapY + 390, 'white'); 
        this.npc0.anims.play('redBack');
        this.npc2.anims.play('yellowBack'); 
        this.npc3.anims.play('darkblueBack'); 
        this.npc4.anims.play('brownBack'); 
        this.npc5.anims.play('pinkBack'); 
        this.npc6.anims.play('whiteblueBack'); 
        this.npc7.anims.play('purpleBack'); 
        this.npc8.anims.play('whiteBack'); 
        this.npcGroup.add(this.npc0);
        this.npcGroup.add(this.npc1);
        this.npcGroup.add(this.npc2);
        this.npcGroup.add(this.npc3);
        this.npcGroup.add(this.npc4);
        this.npcGroup.add(this.npc5);
        this.npcGroup.add(this.npc6);
        this.npcGroup.add(this.npc7);
        this.npcGroup.add(this.npc8);

        // add collisions
        this.player.body.setCollideWorldBounds(true);
        this.wallLayer.setCollisionByProperty({ collides: true });
        this.furnitureLayer.setCollisionByProperty({ collides: true });
        this.decorLayer.setCollisionByProperty({ collides: true });
        this.doorLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.npcGroup);
        this.physics.add.collider(this.player, this.wallLayer);
        this.physics.add.collider(this.player, this.furnitureLayer);
        this.physics.add.collider(this.player, this.decorLayer);
        this.physics.add.collider(this.player, this.doorLayer);

        // door collision square 
        this.s = this.physics.add.sprite(560, 180).setOrigin(0);
        this.s.body.setSize(32, 32);

        // add input
        this.cursors = this.input.keyboard.createCursorKeys();
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // player & door collision
        if (this.done == true) {
            this.physics.add.collider(this.player, this.s, (player, door) => {
                this.scene.start('eyeExamScene');
            }, null, this)
        }

        // player movement
        this.direction = new Phaser.Math.Vector2(0);
        if (this.cursors.left.isDown) {
            this.direction.x = -1;
            this.player.anims.play('blueLeft', true);
        } else if (this.cursors.right.isDown) {
            this.direction.x = 1;
            this.player.anims.play('blueRight', true);
        }
        if (this.cursors.up.isDown) {
            this.direction.y = -1;
            this.player.anims.play('blueBack', true);
        } else if (this.cursors.down.isDown) {
            this.direction.y = 1;
            this.player.anims.play('blueWalk', true);
        }
        this.direction.normalize();
        this.player.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);

        this.npc0.y--;
        this.npc2.y--;
        this.npc3.y--;
        this.npc4.y--;
        this.npc5.y--;
        this.npc6.y--;
        this.npc7.y--;
        this.npc8.y--;
        if(this.npc0.y < this.mapY - 125) {
            this.npc0.destroy();
        }
        if(this.npc2.y < this.mapY - 125) {
            this.npc2.destroy();
        }
        if(this.npc3.y < this.mapY - 125) {
            this.npc3.destroy();
        }
        if(this.npc4.y < this.mapY - 125) {
            this.npc4.destroy();
        }
        if(this.npc5.y < this.mapY - 125) {
            this.npc5.destroy();
        }
        if(this.npc6.y < this.mapY - 125) {
            this.npc6.destroy();
        }
        if(this.npc7.y < this.mapY - 125) {
            this.npc7.destroy();
        }
        if(this.npc8.y < this.mapY - 125) {
            this.npc8.destroy();
            this.done = true; 
        }
    }
}