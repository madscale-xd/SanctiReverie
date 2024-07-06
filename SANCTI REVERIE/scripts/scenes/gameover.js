//level 1 game over screen

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create(data) {
        this.sound.stopAll(); // Stops EVERYTHING from the previous scene (especially stepSFX)
        this.clickSFX = this.sound.add('clickSFX', { volume: 0.8 });
        this.hoverSFX = this.sound.add('hoverSFX', { volume: 0.8 });
        this.loseBGM = this.sound.add('loseBGM', {volume: 0.4, loop:true});
        this.loseBGM.play();

        // Delay the music AND game over screen for dramatic effect
        this.add.image(0, 0, 'mainMenuBackground').setOrigin(0);

        let finalScore = data.score; // Data object carries over the SCORE and GEMS stats from GameScene
        let finalGems = data.gems;
        const gameOverText = this.add.text(750, 180, 'GAME OVER', {
            fontSize: '90px',
            fill: '#d7a04c',
            fontFamily: 'antiquity'
        }).setOrigin(0.5);

        // Blinking effect for "GAME OVER" text
        this.time.addEvent({
            delay: 700, // Blink every half second
            callback: () => {
                gameOverText.setVisible(!gameOverText.visible);
            },
            loop: true
        });

        this.add.text(750, 300, `Final Score: ${finalScore}`, {
            fontSize: '36px',
            fontFamily: 'antiquity',
            fill: '#d7a04c',
        }).setOrigin(0.5);

        // Create buttons with hover states
        this.createButton(500, 550, 'retry', 'retryhover', 'Arena2Scene');
        this.createButton(1000, 550, 'exit', 'exithover', 'MainMenuScene');
    }

    createButton(x, y, key, hoverKey, sceneKey) {
        const button = this.add.image(x, y, key).setOrigin(0.5);
        const buttonHover = this.add.image(x, y, hoverKey).setOrigin(0.5).setVisible(false);

        button.setInteractive();
        button.on('pointerover', () => {
            this.hoverSFX.play();
            button.setVisible(false);
            buttonHover.setVisible(true);
        });

        button.on('pointerout', () => {
            button.setVisible(true);
            buttonHover.setVisible(false);
        });

        button.on('pointerdown', () => {
            this.clickSFX.play();
            this.loseBGM.stop();
            this.scene.start(sceneKey);
        });

        buttonHover.setInteractive();
        buttonHover.on('pointerover', () => {
            this.hoverSFX.play();
            button.setVisible(false);
            buttonHover.setVisible(true);
        });

        buttonHover.on('pointerout', () => {
            button.setVisible(true);
            buttonHover.setVisible(false);
        });

        buttonHover.on('pointerdown', () => {
            this.clickSFX.play();
            this.loseBGM.stop();
            this.scene.start(sceneKey);
        });
    }
}
