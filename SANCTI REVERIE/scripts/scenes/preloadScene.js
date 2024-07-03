//preload scene

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }
    
    
    preload(){
        //testgame
        this.load.image('player', '../assets/images/spritesheets/sancti.png');
        this.load.image('sword', '../assets/images/spritesheets/sword.png');
        this.load.image('forest', '../assets/images/img/forest.png');
        this.load.image('hitbox', '../assets/images/img/hitbox.png');
        this.load.image('hitboxH', '../assets/images/img/hitboxH.png');
        //menuscene
        this.load.image('launch','../assets/images/buttons/launch.png');
        this.load.image('about','../assets/images/buttons/about.png');
        this.load.image('exit','../assets/images/buttons/exit.png');
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

        this.time.delayedCall(3000, () => {
            this.loadingText.destroy();
            this.scene.start('MainMenuScene');
        }, [], this);
    }
}