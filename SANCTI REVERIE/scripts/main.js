//sceneManager file

import TestScene from '../scripts/scenes/testgame.js';
import MainMenuScene from '../scripts/scenes/menuScene.js';
import PreloadScene from '../scripts/scenes/preloadScene.js';
import CredScene from './scenes/credScene.js';
import GameOverScene from './scenes/gameover.js';

var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 750,
    scene: [PreloadScene, TestScene, MainMenuScene, CredScene, GameOverScene], //leftmost gets loaded FIRST
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