class Pill extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, w, (Math.random() * 272) + 184, 'pill'); 
        
        this.parentScene = scene; 

        // set up physics sprite
        this.parentScene.add.existing(this);  
        this.parentScene.physics.add.existing(this); 
        this.setVelocityX(velocity); 
        this.body.immovable = true;                    
        this.body.allowGravity = false; 
        this.newPill = true;  
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