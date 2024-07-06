//level 1 game victory screen

export default class GameWinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameWinScene' });
    }

    create(data) {
        this.sound.stopAll();      
        this.clickSFX = this.sound.add('clickSFX', { volume:0.8});
        this.hoverSFX = this.sound.add('hoverSFX', { volume:0.8});

        this.add.image(750, 375, 'gamewin');
        this.finalScore = data.score;
        this.finalGems = data.gems;
        this.add.text(750, 120, `GOING DEEPER!`, { 
            fontSize: '130px', 
            fill: '#15181c', 
            stroke: '#5e759e',
            strokeThickness: 6,
            fontFamily: 'Yoster' 
        }).setOrigin(0.5);
        this.add.text(750, 590, `Final Score: ${this.finalScore}`, { 
            fontSize: '55px', 
            fill: '#15181c', 
            stroke: '#5e759e',
            strokeThickness: 6,
            fontFamily: 'Yoster' 
        }).setOrigin(0.5);
        
        this.add.text(750, 680, `Gems Gathered: ${this.finalGems} gems`, { 
            fontSize: '55px', 
            fill: '#15181c', 
            stroke: '#5e759e',
            strokeThickness: 6,
            fontFamily: 'Yoster' 
        }).setOrigin(0.5);

        //button setups
        const retryblue = this.add.image(320, 440, 'retryblue').setScale(1.4);
        const stepbackblue = this.add.image(1180, 440, 'stepbackblue').setScale(1.4);

        //retry button event listeners and interactivity (brings you to the first level)
        retryblue.setInteractive();
        retryblue.on('pointerover', () => {
            this.hoverSFX.play();
            retryblue.setScale(1.5); 
        });
 
        retryblue.on('pointerout', function () {
            retryblue.setScale(1.4); 
         });
 
        retryblue.setInteractive().on('pointerdown', () => {
            this.clickSFX.play();
            this.scene.pause();
            this.scene.start('Arena2Scene');
         });
 
        //menu button event listeners and interactivity (brings you to main menu)
        stepbackblue.setInteractive();
        stepbackblue.on('pointerover', () => {
            this.hoverSFX.play();
            stepbackblue.setScale(1.5); 
        });
  
        stepbackblue.on('pointerout', function () {
            stepbackblue.setScale(1.4); 
          });
  
        stepbackblue.setInteractive().on('pointerdown', () => {
            this.clickSFX.play();
            this.scene.pause();
            this.scene.start('MainMenuScene');
         });
    }
}