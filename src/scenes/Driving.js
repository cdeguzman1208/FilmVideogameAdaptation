class Driving extends Phaser.Scene {
    constructor() {
        super('drivingScene');
    }

    create() {
        this.add.text(centerX, centerY, '(driving minigame)')

        // input
        this.cursors = this.input.keyboard.createCursorKeys();

        this.blue = this.add.rectangle(0, 0, 480, 320, 0x0000ff).setOrigin(0); 
        this.t1 = this.add.text(240, 100, 'The pills are the most difficult,').setOrigin(0.5); 
        this.t2 = this.add.text(240, 150, 'Some taste bitter, others are too large.').setOrigin(0.5); 
        this.t3 = this.add.text(240, 200, 'I\'m taking about thirty a day...\n\n[SPACE]', {align: 'center'}).setOrigin(0.5); 
        this.b = true; 
    }

    update() {
        if (this.b == true) {
            if (this.cursors.space.isDown) {
                this.blue.destroy(); 
                this.t1.destroy(); 
                this.t2.destroy(); 
                this.t3.destroy(); 
                this.b = false; 
            }
        }
    }
}