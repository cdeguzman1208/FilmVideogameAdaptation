class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene');

        // dialog variables
        this.dialogConvo = 0;			// current "conversation"
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual dialog text
        this.nextText = null;			// player prompt text to continue typing

        // character variables
        this.green = null;
        this.tweenDuration = 500;
    }

    create() {
        this.dialog = this.cache.json.get('tutorialDialog');

        // ready the character dialog images offscreen
        this.green = this.add.sprite(-500, 100, 'greenModel')//.setScale(0.2);

        // add dialog box sprite
        this.dialogbox = this.add.rectangle(10, 210, 460, 100, 0xffffff).setOrigin(0);
        // this.dialogbox.setStrokeStyle()

        // initialize dialog text objects (with no text)
        this.dialogText = this.add.text(20, 220, '', textConfig);
        this.add.text(460, 300, '[SPACE]', textConfig).setOrigin(1);
        textConfig.color = '#fff';
        this.add.text(25, 190, 'FRONT DESK', textConfig);
        // console.log(this.dialogText);

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
            // I increment conversations here, but you could create logic to exit the dialog here
            this.dialogConvo++;
        }

        // make sure we haven't run out of conversations...
        if (this.dialogConvo >= this.dialog.length) {
            // here I'm simply "exiting" the last speaker and removing the dialog box,
            // but you could build other logic to change game states here
            console.log('End of Conversations');
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
            // console.log(this.dialogLines); 
            this.dialogText.text = this.dialogLines;

            // increment dialog line
            this.dialogLine++;

            // set past speaker
            this.dialogLastSpeaker = this.dialogSpeaker;
        }
    }

    update() {
        // check for spacebar press
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && !this.dialogTyping) {
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