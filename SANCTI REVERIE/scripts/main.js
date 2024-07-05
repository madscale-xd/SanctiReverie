//sceneManager file

import TestScene from '../scripts/scenes/testgame.js';
import MainMenuScene from '../scripts/scenes/menuScene.js';
import PreloadScene from '../scripts/scenes/preloadScene.js';
import CredScene from '../scripts/scenes/credScene.js';
import GameOverScene from '../scripts/scenes/gameover.js';
import GameWinScene from '../scripts/scenes/gamewin.js';
import Arena1Scene from '../scripts/scenes/arena1.js';
import Arena2Scene from '../scripts/scenes/arena2.js';
import ArenaBossScene from '../scripts/scenes/arenaBoss.js';

var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 750,
    scene: [PreloadScene, TestScene, MainMenuScene, CredScene, GameOverScene, GameWinScene, Arena1Scene, Arena2Scene, ArenaBossScene], //leftmost gets loaded FIRST
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