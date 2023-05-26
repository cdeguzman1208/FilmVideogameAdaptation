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
    scene: [ Load, Menu, Play, Credits ],
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    render: {
        pixelArt: true
    }
}

let game = new Phaser.Game(config);