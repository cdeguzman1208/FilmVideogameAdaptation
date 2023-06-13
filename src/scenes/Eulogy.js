class Eulogy extends Phaser.Scene {
    constructor() {
        super('eulogyScene');

        // dialog variables
        this.dialogConvo = 0;			// current "conversation"
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual dialog text
        this.nextText = null;			// player prompt text to continue typing

        // character variables
        this.blue = null; 
        this.tweenDuration = 500;
    }

    create() {
        // add sounds
        this.oceanSounds = this.sound.add('oceanBGM', {loop: true, volume: 0.5})
        this.beepEffect = this.sound.add('beep', {volume: 0.5})
        this.oceanSounds.play()

        // text config 
        textConfig = {
            fontFamily: 'trebuchet ms', 
            fontSize: '16px', 
            color: '#000', 
            fixedWidth: 0
        }

        // add background image
        this.gravebackground = this.add.sprite(centerX, centerY, 'beachBG').setScale(0.25).setOrigin(0.5)
        this.gravebackground.tint = 0x3d7bf6 // make background slightly less blue when he starts saying the names

        this.dialog = this.cache.json.get('graveDialog');

        // ready the character dialog images offscreen
        this.blue = this.add.sprite(-500, 100, 'blueModel');
        this.blue.tint = 0x3d7bf6

        // add dialog box sprite
        this.dialogbox = this.add.rectangle(10, 210, 460, 100, 0xffffff).setOrigin(0);

        // initialize dialog text objects (with no text)
        this.dialogText = this.add.text(20, 220, '', textConfig);
        this.add.text(460, 300, '[SPACE]', textConfig).setOrigin(1);
        textConfig.color = '#fff';
        textConfig.backgroundColor = '#000';
        this.add.text(25, 190, ' BEACH ', textConfig);

        // input
        this.cursors = this.input.keyboard.createCursorKeys();

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
            if (this.dialogLastSpeaker) {
                this.tweens.add({
                    targets: this[this.dialogLastSpeaker],
                    x: -500,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }

            this.time.delayedCall(500, () => {
                this.scene.start('creditsScene');
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
            this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': ' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];
            this.dialogText.text = this.dialogLines;

            if (this.dialog[this.dialogConvo][this.dialogLine]['dialog'] == 'David') {
                this.gravebackground.tint = 0x598EF7
                this.blue.tint = 0x598EF7
            }
            if (this.dialog[this.dialogConvo][this.dialogLine]['dialog'] == 'Howard') {
                this.gravebackground.tint = 0x74A1F9
                this.blue.tint = 0x74A1F9
            }
            if (this.dialog[this.dialogConvo][this.dialogLine]['dialog'] == 'Graham') {
                this.gravebackground.tint = 0x90B4FA
                this.blue.tint = 0x90B4FA
            }
            if (this.dialog[this.dialogConvo][this.dialogLine]['dialog'] == 'Terry') {
                this.gravebackground.tint = 0xACC6FB
                this.blue.tint = 0xACC6FB
            }
            if (this.dialog[this.dialogConvo][this.dialogLine]['dialog'] == 'Paul') {
                this.gravebackground.tint = 0xC8D9FC
                this.blue.tint = 0xC8D9FC
            }
            if (this.dialog[this.dialogConvo][this.dialogLine]['dialog'] == '...') {
                this.gravebackground.tint = 0xE3ECFE
                this.blue.tint = 0xE3ECFE
            }
            if (this.dialog[this.dialogConvo][this.dialogLine]['dialog'] == 'Blue') {
                this.gravebackground.clearTint()
                this.blue.clearTint()
            }

            // increment dialog line
            this.dialogLine++;

            // set past speaker
            this.dialogLastSpeaker = this.dialogSpeaker;
        }
    }

    update() {
        // check for spacebar press
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.beepEffect.play()
            // trigger dialog
            this.showText();
        }
    }
}