// level 1 game victory screen

export default class GameWinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameWinScene' });
    }

    create(data) {
        this.sound.stopAll();
        this.clickSFX = this.sound.add('clickSFX', { volume: 0.8 });
        this.hoverSFX = this.sound.add('hoverSFX', { volume: 0.8 });
        this.winBGM = this.sound.add('winBGM', {volume: 0.4, loop:true});
        this.winBGM.play();

        this.add.image(0, 0, 'mainMenuBackground').setOrigin(0);
        this.finalScore = data.score;
        this.finalGems = data.gems;

        // Blinking text
        const blinkingText = this.add.text(750, 180, `DIVINE TRIUMPH`, {
            fontSize: '72px',
            fill: '#d7a04c',
            fontFamily: 'antiquity'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: blinkingText,
            alpha: 0,
            duration: 500,
            ease: 'Cubic.easeInOut',
            yoyo: true,
            repeat: -1
        });

        this.add.text(750, 300, `Final Score: ${this.finalScore}`, {
            fontSize: '36px',
            fontFamily: 'antiquity',
            fill: '#d7a04c',
        }).setOrigin(0.5);

        // Create buttons with hover states
        this.createButton(550, 550, 'retry', 'retryhover', 'Arena2Scene');
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
            this.scene.pause();
            this.winBGM.stop();
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
            this.scene.pause();
            this.winBGM.stop();
            this.scene.start(sceneKey);
        });
    }
}
