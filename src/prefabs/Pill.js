class Pill extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, w, Math.random() * h, 'sanic'); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity);            // make it go!
        this.body.immovable = true;                    
        this.body.allowGravity = false; 
        this.newPill = true;                 // custom property to control pill spawning
    }

    update() {
        // add new pill when existing pill hits center X
        if(this.newPill && this.x < (centerX / 2)) {
            // (recursively) call parent scene method from this context
            this.parentScene.addPill(this.parent, this.velocity);
            this.newPill = false;
        }

        // destroy pill if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}