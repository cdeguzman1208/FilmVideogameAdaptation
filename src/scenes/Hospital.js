class Hospital extends Phaser.Scene {
    constructor() {
        super('hospitalScene');
    }

    create() {
        // input
        this.cursors = this.input.keyboard.createCursorKeys();

        this.blue = this.add.rectangle(0, 0, 480, 320, 0x0000ff).setOrigin(0); 
        this.t1 = this.add.text(240, 100, 'The road to the city of Aqua Vitae is protected by a labyrinth').setOrigin(0.5); 
        this.t2 = this.add.text(240, 150, 'Built from crystals and mirrors, which in the sunlight,').setOrigin(0.5); 
        this.t3 = this.add.text(240, 200, 'Causes terrible blindness...').setOrigin(0.5); 
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