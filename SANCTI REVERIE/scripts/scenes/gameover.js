//level 1 game over screen

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create(data) {
        this.sound.stopAll();       //stops EVERYTHING from the previous scene (especially stepSFX)
        this.clickSFX = this.sound.add('clickSFX', { volume:0.8});
        this.hoverSFX = this.sound.add('hoverSFX', { volume:0.8});

        //delay the music AND game over screen for dramatic effect 
        this.add.image(750, 375, 'gameover');
        let finalScore = data.score;       //data object carries over the SCORE and GEMS stats from GameScene
        let finalGems = data.gems;
        this.add.text(750, 120, `YOU FELL!`, { 
            fontSize: '130px', 
            fill: '#844347', 
            stroke: '#fbf236',
            strokeThickness: 6,
            fontFamily: 'Arial' 
        }).setOrigin(0.5);
        this.add.text(750, 600, `Final Score: ${finalScore}`, { 
            fontSize: '45px', 
            fill: '#844347', 
            stroke: '#fbf236',
            strokeThickness: 6,
            fontFamily: 'Arial' 
        }).setOrigin(0.5);
        
        this.add.text(750, 680, `Gems Gathered: ${finalGems} gems`, { 
            fontSize: '45px', 
            fill: '#844347', 
            stroke: '#fbf236',
            strokeThickness: 6,
            fontFamily: 'Arial' 
        }).setOrigin(0.5);
        const retry = this.add.image(400, 500, 'retry').setScale(1.1);
        const stepback = this.add.image(1100, 500, 'stepback').setScale(1.1);

        //retry button event listeners and interactivity (brings you to the first level)
        retry.setInteractive();
        retry.on('pointerover', () => {
            this.hoverSFX.play();
            retry.setScale(1.2); 
        });
 
        retry.on('pointerout', function () {
            retry.setScale(1.1); 
         });
 
        retry.setInteractive().on('pointerdown', () => {
            this.clickSFX.play();
            this.scene.pause();
            this.scene.start('Arena2Scene');
         });
 
        //menu button event listeners and interactivity (brings you to main menu)
        stepback.setInteractive();
        stepback.on('pointerover', () => {
            this.hoverSFX.play();
            stepback.setScale(1.2); 
        });
  
        stepback.on('pointerout', function () {
            stepback.setScale(1.1); 
          });
  
        stepback.setInteractive().on('pointerdown', () => {
            this.clickSFX.play();
            this.scene.pause();
            this.scene.start('MainMenuScene');
         });
    }
}