//preload scene

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }
    
    
    preload(){
        //testgame (player stuff)
        this.load.spritesheet('player', '../assets/images/spritesheets/Sancti_Spritesheet.png', { frameWidth: 59, frameHeight: 86 });
        this.load.spritesheet('slashRight', '../assets/images/spritesheets/slashes/slashRight.png', { frameWidth: 48, frameHeight: 96 });
        this.load.spritesheet('slashLeft', '../assets/images/spritesheets/slashes/slashLeft.png', { frameWidth: 48, frameHeight: 96 });
        this.load.spritesheet('slashUp', '../assets/images/spritesheets/slashes/slashUp.png', { frameWidth: 96, frameHeight: 48 });
        this.load.spritesheet('slashDown', '../assets/images/spritesheets/slashes/slashDown.png', { frameWidth: 96, frameHeight: 48 });
        this.load.image('sword', '../assets/images/spritesheets/sword.png');
        this.load.audio('dashSFX','../assets/audio/sfx/dashSFX.mp3');
        this.load.audio('slashSFX','../assets/audio/sfx/slashSFX.mp3');
        this.load.audio('painSFX','../assets/audio/sfx/painSFX.mp3');
        this.load.audio('fireballSFX','../assets/audio/sfx/fireballSFX.mp3');
        this.load.audio('blueSFX','../assets/audio/sfx/blueSFX.mp3');
        this.load.audio('redSFX','../assets/audio/sfx/redSFX.mp3');
        this.load.audio('yellowSFX','../assets/audio/sfx/yellowSFX.mp3');
        this.load.image('forest', '../assets/images/img/forest.png');
        this.load.image('hitbox', '../assets/images/img/hitbox.png');
        this.load.image('hitboxH', '../assets/images/img/hitboxH.png');
        //menuscene
        this.load.image('mainMenuBackground', '../assets/images/ui/mainmenu(1500x750).png');
        this.load.image('gameTitle', '../assets/images/ui/title.png');

        this.load.image('launch', '../assets/images/ui/start.png');
        this.load.image('launchhover', '../assets/images/ui/starthover.png');
        this.load.image('about', '../assets/images/ui/about.png');
        this.load.image('abouthover', '../assets/images/ui/abouthover.png');
        this.load.image('exit', '../assets/images/ui/exit.png');
        this.load.image('exithover', '../assets/images/ui/exithover.png');

        this.load.audio('clickSFX','../assets/audio/sfx/clickSFX.mp3');
        this.load.audio('hoverSFX','../assets/audio/sfx/hoverSFX.mp3');
        //credscene
        this.load.image('back','../assets/images/buttons/back.png');
        //gameoverscene
        this.load.image('gameover','../assets/images/img/gameover.png');
        this.load.image('retry','../assets/images/buttons/retry.png');
        this.load.image('stepback','../assets/images/buttons/stepback.png');
        //gamewinscene
        this.load.image('gamewin','../assets/images/img/gamewin.png');
        this.load.image('retryblue','../assets/images/buttons/retryblue.png');
        this.load.image('stepbackblue','../assets/images/buttons/stepbackblue.png');
        this.load.image('proceedblue','../assets/images/buttons/proceedblue.png');
        //arena tilemaps
        this.load.image('arenaTile','./assets/images/tilemaps/arenatilemapupdated.png');
        this.load.tilemapTiledJSON('arena1','./assets/images/tilemaps/Arena1.json');
        this.load.tilemapTiledJSON('arena2','./assets/images/tilemaps/Arena2.json');
        this.load.tilemapTiledJSON('arenaBoss','./assets/images/tilemaps/ArenaBoss.json');
        this.load.tilemapTiledJSON('arenaFinal','./assets/images/tilemaps/ArenaFinal.json');
        //arena 2
        this.load.image('clouds','./assets/images/backgrounds/clouds.png');
        this.load.image('mist','./assets/images/backgrounds/mist.png');
        this.load.audio('playBGM','../assets/audio/bgm/playBGM.mp3');
        //enemies
        this.load.spritesheet('seraphim','./assets/images/spritesheets/enemies/Seraphim/seraphim.png', { frameWidth: 180, frameHeight: 129 });
        this.load.spritesheet('seraphimBlue','./assets/images/spritesheets/enemies/Seraphim/seraphimBlue.png', { frameWidth: 180, frameHeight: 129 });
        this.load.spritesheet('seraphimRed','./assets/images/spritesheets/enemies/Seraphim/seraphimRed.png', { frameWidth: 180, frameHeight: 129 });
        this.load.spritesheet('seraphimYellow','./assets/images/spritesheets/enemies/Seraphim/seraphimYellow.png', { frameWidth: 180, frameHeight: 129 });
        this.load.spritesheet('seraProj','./assets/images/spritesheets/projectiles/seraproj.png', { frameWidth: 75, frameHeight: 75 });
        this.load.spritesheet('throne','./assets/images/spritesheets/enemies/Throne/throne.png', { frameWidth: 135, frameHeight: 129 });
        this.load.spritesheet('throneBlue','./assets/images/spritesheets/enemies/Throne/throneBlue.png', { frameWidth: 135, frameHeight: 129 });
        this.load.spritesheet('throneRed','./assets/images/spritesheets/enemies/Throne/throneRed.png', { frameWidth: 135, frameHeight: 129 });
        this.load.spritesheet('throneYellow','./assets/images/spritesheets/enemies/Throne/throneYellow.png', { frameWidth: 135, frameHeight: 129 });
    }

    create() {      //loading screen, transitions to Main Menu after the preloading
        this.loadingText = this.add.text(750, 360, 'Lunging into the dungeon...', { 
            fontSize: '85px', 
            fill: '#f4cfaf', 
            stroke: '#863e45',
            strokeThickness: 20, 
            fontFamily: 'Arial'
        }).setOrigin(0.5).setAlpha(1);

        this.time.delayedCall(2000, () => {
            this.loadingText.setAlpha(0);
        }, [], this);

        //change this to test whichever stage
        this.time.delayedCall(3000, () => {
            this.loadingText.destroy();
            this.scene.start('MainMenuScene');
        }, [], this);
    }
}