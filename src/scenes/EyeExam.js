class EyeExam extends Phaser.Scene {
    constructor() {
        super('eyeExamScene');
    }

    create() {
        // add sounds
        this.intenseSounds = this.sound.add('intenseBGM', {loop: true, volume: 0.5});
        this.beepEffect = this.sound.add('beep', {volume: 0.5});
        this.intenseSounds.play();

        // text config 
        let examConfig = {
            fontFamily: 'trebuchet ms', 
            fontSize: '16px', 
            color: '#000', 
            fixedWidth: 0
        }

        // input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyE = this.input.keyboard.addKey('E');

        // dialog box
        this.white = this.add.rectangle(0, 0, 480, 320, 0xffffff).setOrigin(0); 
        this.i = this.add.text(240, 300, 'Type out the letters that appear.', examConfig).setOrigin(0.5); 
        examConfig.fontSize = '50px';
        this.c0 = this.add.text(240, 50, 'E', examConfig).setOrigin(0.5); 
        examConfig.fontSize = '46px';
        examConfig.color = '#00071F';
        this.c1 = this.add.text(240, 75, '', examConfig).setOrigin(0.5); 
        this.e = true; 

        // blue text screen
        this.blue = this.add.rectangle(0, 0, 480, 320, 0x002199).setOrigin(0); 
        this.t1 = this.add.text(240, 100, 'Look left, look down,').setOrigin(0.5); 
        this.t2 = this.add.text(240, 150, 'Look up, look right.').setOrigin(0.5); 
        this.t3 = this.add.text(240, 200, 'Blue flashes in my eyes...').setOrigin(0.5); 
        this.t4 = this.add.text(240, 250, '[SPACE]').setOrigin(0.5);
        this.b = true; 

        this.done = false; 

        // key combos 
        let combo1 = this.input.keyboard.createCombo('fp', {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: false,     
            deleteOnMatch: true    
        });
        let combo2 = this.input.keyboard.createCombo('toz', {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: false,     
            deleteOnMatch: true    
        });
        let combo3 = this.input.keyboard.createCombo('lped', {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: false,     
            deleteOnMatch: true    
        });
        let combo4 = this.input.keyboard.createCombo('pecfd', {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: false,     
            deleteOnMatch: true    
        });
        let combo5 = this.input.keyboard.createCombo('edfczp', {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: false,     
            deleteOnMatch: true    
        });
        let combo6 = this.input.keyboard.createCombo('felopzd', {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: false,     
            deleteOnMatch: true    
        });
        let combo7 = this.input.keyboard.createCombo('defpotec', {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: false,     
            deleteOnMatch: true    
        });
        let combo8 = this.input.keyboard.createCombo('lefodpct', {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: false,     
            deleteOnMatch: true    
        });
        let combo9 = this.input.keyboard.createCombo('fdpltceo', {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: false,     
            deleteOnMatch: true    
        });
        let combo10 = this.input.keyboard.createCombo('pezolcftd', {
            resetOnWrongKey: true,  
            maxKeyDelay: 0,         
            resetOnMatch: false,     
            deleteOnMatch: true    
        });

        // watch for keycombomatches
        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === combo1) { 
                this.c1.destroy(); 
                this.white.fillColor = 0xCCD3EB;
                examConfig.fontSize = '42px';
                this.c2 = this.add.text(240, 100, 'T O Z', examConfig).setOrigin(0.5); 
            }
            if (combo === combo2) {
                this.c2.destroy(); 
                examConfig.fontSize = '38px';
                examConfig.color = '#000D3D';
                this.c3 = this.add.text(240, 120, 'L P E D', examConfig).setOrigin(0.5); 
            }
            if (combo === combo3) {
                this.c3.destroy(); 
                this.white.fillColor = 0x99A6D6;
                examConfig.fontSize = '32px';
                this.c4 = this.add.text(240, 140, 'P E C F D', examConfig).setOrigin(0.5); 
            }
            if (combo === combo4) {
                this.c4.destroy(); 
                examConfig.fontSize = '28px';
                examConfig.color = '#00145C';
                this.c5 = this.add.text(240, 160, 'E D F C Z P', examConfig).setOrigin(0.5); 
            }
            if (combo === combo5) {
                this.c5.destroy(); 
                this.white.fillColor = 0x667AC2;
                examConfig.fontSize = '24px';
                this.c6 = this.add.text(240, 180, 'F E L O P Z D', examConfig).setOrigin(0.5); 
            }
            if (combo === combo6) {
                this.c6.destroy(); 
                examConfig.fontSize = '20px';
                examConfig.color = '#001A7A';
                this.c7 = this.add.text(240, 200, 'D E F P O T E C', examConfig).setOrigin(0.5); 
            }
            if (combo === combo7) {
                this.c7.destroy(); 
                this.white.fillColor = 0x334DAD;
                examConfig.fontSize = '16px';
                this.c8 = this.add.text(240, 220, 'L E F O D P C T', examConfig).setOrigin(0.5); 
            }
            if (combo === combo8) {
                this.c8.destroy(); 
                examConfig.fontSize = '12px';
                examConfig.color = '#002199';
                this.c9 = this.add.text(240, 240, 'F D P L T C E O', examConfig).setOrigin(0.5); 
            }
            if (combo === combo9) {
                this.c9.destroy(); 
                this.white.fillColor = 0x002199;
                examConfig.fontSize = '8px';
                this.c10 = this.add.text(240, 260, 'P E Z O L C F T D', examConfig).setOrigin(0.5); 
                this.done = true; 
            }
            if (combo === combo10) {
                this.c10.destroy(); 
                examConfig.fontSize = '16px';
                examConfig.color = '#000000';
                this.c11 = this.add.text(240, 150, 'you\'re color blind !', examConfig).setOrigin(0.5); 
            }
        });
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

        // test e bc not a key combo
        if (this.e == true) {
            if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
                this.c0.destroy(); 
                this.c1.text = 'F P';
                this.e = false; 
            }
        }

        // leave scene once it turns all blue
        if (this.done == true) {
            if (this.cursors.space.isDown) {
                this.intenseSounds.stop();
                this.scene.start('doctorScene'); 
            }
        }
    }
}