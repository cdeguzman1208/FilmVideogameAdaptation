class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene');
    }

    create() {
        // dialog variables
        this.dialogConvo = 0;
        this.dialogLine = 0;
        this.dialogSpeaker = null;
        this.dialogLastSpeaker = null;
        this.dialogTyping = false;
        this.dialogText = null;		
        this.nextText = null;

        // character variables
        this.green = null;
        this.tweenDuration = 500;
        
        // add sounds
        this.sadSounds = this.sound.add('sadgeBGM', {loop: true, volume: 0.5});
        this.beepEffect = this.sound.add('beep', {volume: 0.5});
        this.sadSounds.play();

        // text config 
        let textConfig = {
            fontFamily: 'trebuchet ms', 
            fontSize: '16px', 
            color: '#000', 
            fixedWidth: 0
        }

        this.dialog = this.cache.json.get('tutorialDialog');

        // add background image
        this.add.sprite(centerX, centerY - 100, 'waitingRoomBG').setScale(0.25).setOrigin(0.5);

        // ready the character dialog images offscreen
        this.green = this.add.sprite(-500, 100, 'greenModel');

        // add dialog box sprite
        this.dialogbox = this.add.rectangle(10, 210, 460, 100, 0xffffff).setOrigin(0);

        // initialize dialog text objects (with no text)
        this.dialogText = this.add.text(20, 220, '', textConfig);
        this.add.text(460, 300, '[SPACE]', textConfig).setOrigin(1);
        textConfig.color = '#fff';
        textConfig.backgroundColor = '#000';
        this.add.text(25, 190, ' FRONT DESK ', textConfig);

        // input
        this.cursors = this.input.keyboard.createCursorKeys();

        // blue text screen
        this.blue = this.add.rectangle(0, 0, 480, 320, 0x002199).setOrigin(0);  ``
        this.t1 = this.add.text(240, 100, 'I step off the curb and a cyclist nearly \nknocks me down.', {align: 'center'}).setOrigin(0.5); 
        this.t2 = this.add.text(240, 150, 'Flying in from the dark, he nearly \nparted my hair.', {align: 'center'}).setOrigin(0.5); 
        this.t3 = this.add.text(240, 200, 'I step into a blue funk...').setOrigin(0.5); 
        this.t4 = this.add.text(240, 250, '[SPACE]').setOrigin(0.5); 
        this.b = true; 

        // start dialog
        this.showText();    
    }

    showText() {
        // make sure there are lines left to read in this convo, otherwise jump to next convo
        if (this.dialogLine > this.dialog[this.dialogConvo].length - 1) {
            this.dialogLine = 0;
            this.dialogConvo++;
        }

        // make sure we haven't run out of conversations...
        if (this.dialogConvo >= this.dialog.length) {
            // tween out prior speaker's image
            if (this.green) {
                this.tweens.add({
                    targets: this.green,
                    x: -500,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }

            this.time.delayedCall(500, () => {
                this.sadSounds.stop();
                this.scene.start('waitingRoomScene');
            }, null, this)
        } 
        else {
            // if not, set current speaker
            this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker'];
            // check if there's a new speaker (for exit/enter animations)
            if (this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']) {
                // tween in new speaker's image
                this.tweens.add({
                    targets: this.green,
                    x: 240,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }

            // build dialog (concatenate speaker + line of text)
            this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': ' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];
            this.dialogText.text = this.dialogLines;

            // increment dialog line
            this.dialogLine++;

            // set past speaker
            this.dialogLastSpeaker = this.dialogSpeaker;
        }
    }

    update() {
        // check for spacebar press
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.beepEffect.play();
            // trigger dialog
            this.showText();
        }

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