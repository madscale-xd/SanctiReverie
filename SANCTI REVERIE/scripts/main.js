//sceneManager file

import TestScene from '../scripts/scenes/testgame.js';

var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 750,
    scene: [TestScene], //leftmost gets loaded FIRST
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    pixelArt: true          //prevents white lines and other visual glitches/inconsistencies
};

const game = new Phaser.Game(config);

game.events.on('ready', function () {       //centers the game on the webpage
    var canvas = game.canvas;
    canvas.style.position = 'absolute';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
});