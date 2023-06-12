class Driving extends Phaser.Scene {
    constructor() {
        super('drivingScene');
    }

    create() {
        // text config 
        let textConfig = {
            fontFamily: 'trebuchet ms', 
            fontSize: '16px', 
            color: '#fff', 
            fixedWidth: 0
        }

        // add map
        this.map = this.add.tilemap('streetJSON')
        this.tileset = this.map.addTilesetImage('tilemap_BLUE', 'tilesetImage2')

        // set map variables
        this.mapX = this.map.widthInPixels / 2
        this.mapY = this.map.heightInPixels / 2

        // add layers
        this.roadLayer = this.map.createLayer('Road', this.tileset, 0, 0)
        this.sidewalkLayer = this.map.createLayer('Sidewalk', this.tileset, 0, 0)//.setDepth(1)
        // this.carsLayer = this.map.createLayer('Cars', this.tileset, 0, 0)//.setDepth(1)

        // set up player car (physics sprite) and set properties
        this.car = this.physics.add.sprite(20, this.mapY, 'car').setOrigin(0, 0.5).setScale(0.75);
        this.car.setDragY(200);
        // this.car.setBounce(0.25);
        this.car.setImmovable();

        this.pillCount = 0; 
        this.pillText = this.add.text(10, 10, '0 pills', textConfig).setScrollFactor(0); 

        // set up pill group
        this.pillGroup = this.add.group({
            runChildUpdate: true 
        });
        this.addPill();

        // add collisions
        this.car.body.setCollideWorldBounds(true)
        this.sidewalkLayer.setCollisionByProperty({ collides: true })
        // this.carsLayer.setCollisionByProperty({ collides: true })
        // this.physics.add.collider(this.player, this.pillGroup)
        this.physics.add.collider(this.car, this.sidewalkLayer)
        // this.physics.add.collider(this.car, this.carsLayer)

        // car & pill overlap check
        this.physics.add.overlap(this.car, this.pillGroup, (car, pill) => {
            this.pillCount++; 
            this.pillText.text = this.pillCount + ' pills'; 
            pill.destroy(); 
        }, null, this)

        // input
        this.cursors = this.input.keyboard.createCursorKeys();

        // blue text screen
        this.blue = this.add.rectangle(0, 0, 480, 320, 0x002199).setOrigin(0).setDepth(1)
        this.t1 = this.add.text(240, 100, 'The pills are the most difficult,').setOrigin(0.5).setDepth(1)
        this.t2 = this.add.text(240, 150, 'Some taste bitter, others are too large.').setOrigin(0.5).setDepth(1)
        this.t3 = this.add.text(240, 200, 'I\'m taking about thirty a day...').setOrigin(0.5).setDepth(1)
        this.t4 = this.add.text(240, 250, '[SPACE]').setOrigin(0.5).setDepth(1)
        this.b = true; 
    }

    addPill() {
        let pill = new Pill(this, -150).setScale(0.5); 
        this.pillGroup.add(pill); 
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

                // add cameras
                this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
                this.cameras.main.startFollow(this.car, true, 0.5, 0.25)
                this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels)
            }
        }

        if(this.roadLayer.x > -w) {
            this.roadLayer.x -= 4
            this.sidewalkLayer.x -= 4
        }
        else {
            this.roadLayer.x = 0
            this.sidewalkLayer.x = 0
        }

        // car movement
        this.direction = new Phaser.Math.Vector2(0);
        if (this.cursors.up.isDown) {
            this.direction.y = -1;
            // this.car.setVelocity(0, -1 * 300); 
        } else if (this.cursors.down.isDown) {
            this.direction.y = 1;
            // this.car.setVelocity(0, 1 * 300); 
        }
        this.direction.normalize();
        this.car.setVelocity(150 * this.direction.x, 300 * this.direction.y);

        if (this.pillCount == 30) {
            // this.car.setVelocity(300, 0)
            this.scene.start('beachScene'); 
        }
    }
}