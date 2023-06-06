class EyeExam extends Phaser.Scene {
    constructor() {
        super('eyeExamScene');
    }

    create() {
        // text config 
        let examConfig = {
            fontFamily: 'trebuchet ms', 
            fontSize: '16px', 
            color: '#000', 
            fixedWidth: 0
        }

        this.add.text(centerX, centerY, '(eye exam scene)')

        // input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyE = this.input.keyboard.addKey('E');

        this.white = this.add.rectangle(0, 0, 480, 320, 0xffffff).setOrigin(0); 
        this.i = this.add.text(240, 300, 'Type out the letters that appear.', examConfig).setOrigin(0.5); 
        examConfig.fontSize = '50px';
        this.c0 = this.add.text(240, 50, 'E', examConfig).setOrigin(0.5); 
        examConfig.fontSize = '46px';
        this.c1 = this.add.text(240, 75, '', examConfig).setOrigin(0.5); 
        this.e = true; 

        this.blue = this.add.rectangle(0, 0, 480, 320, 0x002199).setOrigin(0); 
        this.t1 = this.add.text(240, 100, 'Look left, look down,', textConfig).setOrigin(0.5); 
        this.t2 = this.add.text(240, 150, 'Look up, look right.', textConfig).setOrigin(0.5); 
        this.t3 = this.add.text(240, 200, 'Blue flashes in my eyes...', textConfig).setOrigin(0.5); 
        this.t4 = this.add.text(240, 250, '[SPACE]', textConfig).setOrigin(0.5);
        this.b = true; 

        let combo1 = this.input.keyboard.createCombo('fp', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: false,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true    // if combo matches, will it delete itself?
        });
        let combo2 = this.input.keyboard.createCombo('toz', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: false,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true    // if combo matches, will it delete itself?
        });
        let combo3 = this.input.keyboard.createCombo('lped', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: false,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true    // if combo matches, will it delete itself?
        });
        let combo4 = this.input.keyboard.createCombo('pecfd', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: false,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true    // if combo matches, will it delete itself?
        });
        let combo5 = this.input.keyboard.createCombo('edfczp', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: false,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true    // if combo matches, will it delete itself?
        });
        let combo6 = this.input.keyboard.createCombo('felopzd', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: false,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true    // if combo matches, will it delete itself?
        });
        let combo7 = this.input.keyboard.createCombo('defpotec', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: false,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true    // if combo matches, will it delete itself?
        });
        let combo8 = this.input.keyboard.createCombo('lefodpct', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: false,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true    // if combo matches, will it delete itself?
        });
        let combo9 = this.input.keyboard.createCombo('fdpltceo', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: false,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true    // if combo matches, will it delete itself?
        });
        let combo10 = this.input.keyboard.createCombo('pezolcftd', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: false,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true    // if combo matches, will it delete itself?
        });

        // watch for keycombomatches
        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === combo1) { 
                this.c1.destroy(); 
                examConfig.fontSize = '42px';
                this.c2 = this.add.text(240, 100, 'T O Z', examConfig).setOrigin(0.5); 
            }
            if (combo === combo2) {
                this.c2.destroy(); 
                examConfig.fontSize = '38px';
                this.c3 = this.add.text(240, 120, 'L P E D', examConfig).setOrigin(0.5); 
            }
            if (combo === combo3) {
                this.c3.destroy(); 
                examConfig.fontSize = '32px';
                this.c4 = this.add.text(240, 140, 'P E C F D', examConfig).setOrigin(0.5); 
            }
            if (combo === combo4) {
                this.c4.destroy(); 
                examConfig.fontSize = '28px';
                this.c5 = this.add.text(240, 160, 'E D F C Z P', examConfig).setOrigin(0.5); 
            }
            if (combo === combo5) {
                this.c5.destroy(); 
                examConfig.fontSize = '24px';
                this.c6 = this.add.text(240, 180, 'F E L O P Z D', examConfig).setOrigin(0.5); 
            }
            if (combo === combo6) {
                this.c6.destroy(); 
                examConfig.fontSize = '20px';
                this.c7 = this.add.text(240, 200, 'D E F P O T E C', examConfig).setOrigin(0.5); 
            }
            if (combo === combo7) {
                this.c7.destroy(); 
                examConfig.fontSize = '16px';
                this.c8 = this.add.text(240, 220, 'L E F O D P C T', examConfig).setOrigin(0.5); 
            }
            if (combo === combo8) {
                this.c8.destroy(); 
                examConfig.fontSize = '12px';
                this.c9 = this.add.text(240, 240, 'F D P L T C E O', examConfig).setOrigin(0.5); 
            }
            if (combo === combo9) {
                this.c9.destroy(); 
                examConfig.fontSize = '8px';
                this.c10 = this.add.text(240, 260, 'P E Z O L C F T D', examConfig).setOrigin(0.5); 
            }
            if (combo === combo10) {
                this.c10.destroy(); 
                examConfig.fontSize = '16px';
                this.c11 = this.add.text(240, 150, 'you\'re color blind !', examConfig).setOrigin(0.5); 
            }
        });
    }

    update() {
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

        if (this.e == true) {
            if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
                this.c0.destroy(); 
                this.c1.text = 'F P'
                this.e = false; 
            }
        }
    }
}

// international klein blue #002199