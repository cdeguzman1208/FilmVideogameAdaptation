class EyeExam extends Phaser.Scene {
    constructor() {
        super('eyeExamScene');
    }

    create() {
        // input
        this.cursors = this.input.keyboard.createCursorKeys();

        this.blue = this.add.rectangle(0, 0, 480, 320, 0x0000ff).setOrigin(0); 
        this.t1 = this.add.text(240, 100, 'Look left, look down,').setOrigin(0.5); 
        this.t2 = this.add.text(240, 150, 'Look up, look right.').setOrigin(0.5); 
        this.t3 = this.add.text(240, 200, 'Blue flashes in my eyes...').setOrigin(0.5); 
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