/*
NAMES
• cromwell de guzman
• beatrice yu

PHASER COMPONENTS
1. physics systems
2. cameras
3. text objects
4. animation manager
5. tween manager
6. tilemaps

TILT
Our game drew inspiration from a film that lacked any sort of visual elements,
so we had to improvise by adding several copyright free visuals in order to make our game come to life
since the choice of color in these visual assets had to play a pivotal role in our game, thematically.
We also chose to implement 6 scenes from the movie into our game instead of 3.
While the 3 visual novel scenes were straight 1:1 adaptations of the film's events,
the other half of our game used various mini puzzle games in order to symbolically convey
the challenging hardships of the film's overall theme of dealing with deteriorating health issues.
*/

// tame the javashrek
'use strict';

// main game object
let config  = {
    type: Phaser.AUTO,
    width: 480,
    height: 320,
    zoom: 2,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Menu, Tutorial, WaitingRoom, EyeExam, Doctor, Hospital, Nurse, Driving, Beach, Eulogy, Credits ],
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    render: {
        pixelArt: true
    }
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keySpace;

// global variable
let w = game.config.width
let h = game.config.height
let centerX = w / 2
let centerY = h / 2

// text config 
let textConfig = {
    fontFamily: 'trebuchet ms', 
    fontSize: '16px', 
    color: '#000', 
    fixedWidth: 0
}