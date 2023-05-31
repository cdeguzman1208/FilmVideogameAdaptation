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
tba
*/

// tame the javashrek
'use strict';

// main game object
let config  = {
    type: Phaser.AUTO,
    width: 320,
    height: 200,
    zoom: 3,
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
    scene: [ Load, Menu, Play, Credits, Levels, Talking ],
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