class Driving extends Phaser.Scene {
    constructor() {
        super('drivingScene');
    }

    create() {
        this.add.text(centerX, centerY, '(driving minigame)')

        // set up player car (physics sprite) and set properties
        this.car = this.physics.add.sprite(20, centerY, 'car').setOrigin(0, 0.5);
        this.car.body.setCollideWorldBounds(true);
        // this.car.setVelocityX(300);

        // set up pill group
        this.pillGroup = this.add.group({
            runChildUpdate: true 
        });
        // this.addPill();

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
        if(this.cursors.up.isDown) {
            // this.direction.y = -1;
            this.car.setVelocity(0, -1 * 100); 
        } else if(this.cursors.down.isDown) {
            // this.direction.y = 1;
            this.car.setVelocity(0, 1 * 100); 
        }

        // if (this.cursors.space.isDown) {
        //     this.scene.start('eulogyScene'); 
        // }
    }
}