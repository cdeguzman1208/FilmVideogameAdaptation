class Hospital extends Phaser.Scene {
    constructor() {
        super('hospitalScene');
    }

    create() {
        this.add.text(centerX, centerY, '(hospital scene)')

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
            }
        }
    }
}