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
    width: 960,
    height: 640,
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
    scene: [ Load, Menu, Play, Credits, Levels ],
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    render: {
        pixelArt: true
    }
}

let game = new Phaser.Game(config);