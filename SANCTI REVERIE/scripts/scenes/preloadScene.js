//preload scene

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }
    
    
    preload(){
        //testgame (player stuff)
        this.load.spritesheet('player', '../assets/images/spritesheets/Sancti_Spritesheet.png', { frameWidth: 59, frameHeight: 86 });
        this.load.spritesheet('heart', '../assets/images/spritesheets/heartSprite.png', { frameWidth: 615, frameHeight: 123 });
        this.load.spritesheet('slashRight', '../assets/images/spritesheets/slashes/slashRight.png', { frameWidth: 48, frameHeight: 96 });
        this.load.spritesheet('slashLeft', '../assets/images/spritesheets/slashes/slashLeft.png', { frameWidth: 48, frameHeight: 96 });
        this.load.spritesheet('slashUp', '../assets/images/spritesheets/slashes/slashUp.png', { frameWidth: 96, frameHeight: 48 });
        this.load.spritesheet('slashDown', '../assets/images/spritesheets/slashes/slashDown.png', { frameWidth: 96, frameHeight: 48 });
        this.load.image('sword', '../assets/images/spritesheets/sword.png');
        this.load.image('portrait', '../assets/images/spritesheets/portrait.png');
        this.load.image('scorebar', '../assets/images/spritesheets/scoreBar.png');
        this.load.image('plainborder', '../assets/images/ui/background/plainborder.png');
        this.load.spritesheet('swordd', '../assets/images/spritesheets/swordd.png', {frameWidth: 54, frameHeight: 252});
        this.load.audio('dashSFX','../assets/audio/sfx/dashSFX.mp3');
        this.load.audio('slashSFX','../assets/audio/sfx/slashSFX.mp3');
        this.load.audio('painSFX','../assets/audio/sfx/painSFX.mp3');
        this.load.audio('fireballSFX','../assets/audio/sfx/fireballSFX.mp3');
        this.load.audio('laserSFX','../assets/audio/sfx/laserSFX.mp3');
        this.load.audio('blueSFX','../assets/audio/sfx/blueSFX.mp3');
        this.load.audio('redSFX','../assets/audio/sfx/redSFX.mp3');
        this.load.audio('yellowSFX','../assets/audio/sfx/yellowSFX.mp3');
        this.load.audio('destructionSFX','../assets/audio/sfx/destructionSFX.mp3');
        this.load.image('forest', '../assets/images/img/forest.png');
        this.load.image('hitbox', '../assets/images/img/hitbox.png');
        this.load.image('hitboxH', '../assets/images/img/hitboxH.png');
        //menuscene
        this.load.image('mainMenuBackground', '../assets/images/ui/background/mainmenu(1500x750).png');
        this.load.image('gameTitle', '../assets/images/ui/title.png');
        this.load.image('launch', '../assets/images/ui/buttons/start.png');
        this.load.image('launchhover', '../assets/images/ui/buttons/starthover.png');
        this.load.image('about', '../assets/images/ui/buttons/about.png');
        this.load.image('abouthover', '../assets/images/ui/buttons/abouthover.png');
        this.load.image('exit', '../assets/images/ui/buttons/exit.png');
        this.load.image('exithover', '../assets/images/ui/buttons/exithover.png');
        this.load.image('retry', '../assets/images/ui/buttons/retry.png');
        this.load.image('retryhover', '../assets/images/ui/buttons/retryhover.png');
        this.load.audio('clickSFX','../assets/audio/sfx/clickSFX.mp3');
        this.load.audio('hoverSFX','../assets/audio/sfx/hoverSFX.mp3');
        //credscene
        this.load.image('back', '../assets/images/ui/buttons/backbutton.png');
        this.load.image('backhover', '../assets/images/ui/buttons/backbuttonhover.png');
        //loadingscene
        this.load.spritesheet('gameloading', '../assets/images/ui/loading.png', { frameWidth: 95, frameHeight: 95 });
        //gameoverscene
        this.load.image('gameover','../assets/images/img/gameover.png');
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
        this.load.audio('bossBGM','../assets/audio/bgm/bossBGM.mp3');
        this.load.audio('winBGM','../assets/audio/bgm/winBGM.mp3');
        this.load.audio('loseBGM','../assets/audio/bgm/loseBGM.mp3');
        this.load.audio('startBGM','../assets/audio/bgm/startBGM.mp3');
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
        this.load.spritesheet('eligius','./assets/images/spritesheets/enemies/Boss/eligius.png', { frameWidth: 225, frameHeight: 396 });
        this.load.spritesheet('candleblue','./assets/images/spritesheets/enemies/Boss/Candle/withEmpty/candleblue.png', { frameWidth: 162, frameHeight: 207 });
        this.load.spritesheet('candlered','./assets/images/spritesheets/enemies/Boss/Candle/withEmpty/candlered.png', { frameWidth: 162, frameHeight: 207 });
        this.load.audio('destructionSFX','../assets/audio/sfx/destructionSFX.mp3');
        this.load.spritesheet('candleyellow','./assets/images/spritesheets/enemies/Boss/Candle/withEmpty/candleyellow.png', { frameWidth: 162, frameHeight: 207 });
        this.load.spritesheet('handAttack','./assets/images/spritesheets/enemies/Boss/HandAttack/BossHandSprite.png', { frameWidth: 132, frameHeight: 207 });
        this.load.spritesheet('bossLaser','./assets/images/spritesheets/enemies/Boss/LaserAttack/withEmpty/BossLaserSheet.png', { frameWidth: 45, frameHeight: 975 });
        this.load.spritesheet('bossOrb','./assets/images/spritesheets/enemies/Boss/LaserAttack/withEmpty/BossOrbSheet.png', { frameWidth: 75, frameHeight: 105 });
    }

    create() {
        this.cameras.main.setBackgroundColor('#fbeae3');
        // Loading screen, transitions to Main Menu after preloading
        this.loadingText = this.add.text(750, 360, 'Opening the Gates...', { 
            fontSize: '72px', 
            fill: '#d7a04c', 
            fontFamily: 'antiquity'
        }).setOrigin(0.5).setAlpha(1);

        this.time.delayedCall(2000, () => {
            this.loadingText.setAlpha(0);
        }, [], this);

        // Create and start the loading sprite animation
        this.anims.create({
            key: 'loading',
            frames: this.anims.generateFrameNumbers('gameloading', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: -1
        });
        
        const loadingSprite = this.add.sprite(1400, 670, 'gameloading').setOrigin(0.5);
        loadingSprite.play('loading');

        // Change this to test whichever stage
        this.time.delayedCall(3000, () => {
            this.loadingText.destroy();
            loadingSprite.destroy();
            this.scene.start('MainMenuScene');
        }, [], this);
    }
}