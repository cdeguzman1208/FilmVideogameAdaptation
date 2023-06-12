class Driving extends Phaser.Scene {
    constructor() {
        super('drivingScene');
    }

    create() {
        this.done = false; 

        // set up player car (physics sprite) and set properties
        this.car = this.physics.add.sprite(20, centerY, 'car').setOrigin(0, 0.5);
        this.car.body.setCollideWorldBounds(true);
        this.car.setDragY(200);
        // this.car.setBounce(0.25);
        this.car.setImmovable();

        // set up pill group
        this.pillGroup = this.add.group({
            runChildUpdate: true 
        });
        this.addPill();

        // input
        this.cursors = this.input.keyboard.createCursorKeys();

        // blue text screen
        this.blue = this.add.rectangle(0, 0, 480, 320, 0x002199).setOrigin(0); 
        this.t1 = this.add.text(240, 100, 'The pills are the most difficult,').setOrigin(0.5); 
        this.t2 = this.add.text(240, 150, 'Some taste bitter, others are too large.').setOrigin(0.5); 
        this.t3 = this.add.text(240, 200, 'I\'m taking about thirty a day...').setOrigin(0.5); 
        this.t4 = this.add.text(240, 250, '[SPACE]').setOrigin(0.5);
        this.b = true; 
    }

    addPill() {
        let pill = new Pill(this, -150); 
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
            }
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

        if (this.done == true && this.cursors.space.isDown) {
            // this.car.setVelocity(300, 0)
            this.scene.start('eulogyScene'); 
        }
    }
}