class Doctor extends Phaser.Scene {
    constructor() {
        super('doctorScene');

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
        this.add.text(centerX, centerY, '(conversation with doctor)').setOrigin(0.5);

        this.dialog = this.cache.json.get('tutorialDialog');

        // ready the character dialog images offscreen
        this.red = this.add.sprite(-500, 100, 'redModel');
        this.blue = this.add.sprite(-500, 100, 'blueModel'); 

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

    update() {

    }
}