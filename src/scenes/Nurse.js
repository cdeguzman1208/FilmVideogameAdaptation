class Nurse extends Phaser.Scene {
    constructor() {
        super('nurseScene');

        // dialog variables
        this.dialogConvo = 0;		
        this.dialogLine = 0;		
        this.dialogSpeaker = null;	
        this.dialogLastSpeaker = null;	
        this.dialogTyping = false;		
        this.dialogText = null;			
        this.nextText = null;			

        // character variables
        this.yellow = null;
        this.blue = null; 
        this.tweenDuration = 500;
    }

    create() {
        // add sounds
        this.sadSounds = this.sound.add('sadgeBGM', {loop: true, volume: 0.5});
        this.beepEffect = this.sound.add('beep', {volume: 0.5});
        this.sadSounds.play();

        // text config 
        textConfig = {
            fontFamily: 'trebuchet ms', 
            fontSize: '16px', 
            color: '#000', 
            fixedWidth: 0
        }

        // add background image
        this.nursebackground = this.add.sprite(centerX, centerY - 100, 'inPatientRoomBG').setScale(0.25).setOrigin(0.5);
        this.nursebackground.tint = 0x3d7bf6;

        this.dialog = this.cache.json.get('nurseDialog');

        // ready the character dialog images offscreen
        this.yellow = this.add.sprite(-500, 100, 'yellowModel');
        this.yellow.tint = 0x3d7bf6;
        this.blue = this.add.sprite(-500, 100, 'blueModel'); 
        this.blue.tint = 0x3d7bf6;

        // add dialog box sprite
        this.dialogbox = this.add.rectangle(10, 210, 460, 100, 0xffffff).setOrigin(0);

        // initialize dialog text objects (with no text)
        this.dialogText = this.add.text(20, 220, '', textConfig);
        this.add.text(460, 300, '[SPACE]', textConfig).setOrigin(1);
        textConfig.color = '#fff';
        textConfig.backgroundColor = '#000';
        this.add.text(25, 190, ' IN-PATIENT ROOM ', textConfig);

        // input
        this.cursors = this.input.keyboard.createCursorKeys();

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
            console.log('End of Conversations');
            // tween out prior speaker's image
            if (this.dialogLastSpeaker) {
                this.tweens.add({
                    targets: this[this.dialogLastSpeaker],
                    x: -500,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }

            this.time.delayedCall(500, () => {
                this.sadSounds.stop();
                this.scene.start('drivingScene');
            }, null, this)
        } 
        else {
            // if not, set current speaker
            this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker'];
            // check if there's a new speaker (for exit/enter animations)
            if (this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']) {
                // tween out prior speaker's image
                if(this.dialogLastSpeaker) {
                    this.tweens.add({ 
                        targets: this[this.dialogLastSpeaker],
                        x: -500,
                        duration: this.tweenDuration,
                        ease: 'Linear'
                    });
                }
                // tween in new speaker's image
                this.tweens.add({
                    targets: this[this.dialogSpeaker],
                    x: 240,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }

            // build dialog (concatenate speaker + line of text)
            if (this.dialog[this.dialogConvo][this.dialogLine]['speaker'] == 'yellow') {
                this.dialogLines = 'NURSE ' + this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': ' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];

            }
            else {
                this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': ' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];
            }
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
    }
}