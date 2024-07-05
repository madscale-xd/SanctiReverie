//main menu scene

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        // sfx
        this.clickSFX = this.sound.add('clickSFX', { volume: 0.8 });
        this.hoverSFX = this.sound.add('hoverSFX', { volume: 0.8 });
        
        // Set the background image to cover the entire scene
        this.add.image(0, 0, 'mainMenuBackground').setOrigin(0);

        // Add the game title image
        this.add.image(750, 200, 'gameTitle').setOrigin(0.5);

        // Create buttons with hover states
        this.createButton(750, 480, 'launch', 'launchhover', 'Arena2Scene');
        this.createButton(750, 550, 'about', 'abouthover', 'CredScene');
        this.createButton(750, 620, 'exit', 'exithover', null, () => {
            alert('The gates of Heaven are always open for you, Sancti.');
            window.close();
        });

        // Footer text
        this.add.text(750, 700, 'Alcove Studios, 2024', {
            fontSize: '18px',
            fontFamily: 'antiquity',
            fill: '#d7a04c',
        }).setOrigin(0.5);
    }

    createButton(x, y, key, hoverKey, sceneKey, callback) {
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
            if (callback) {
                callback();
            } else if (sceneKey) {
                this.scene.start(sceneKey);
            }
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
            if (callback) {
                callback();
            } else if (sceneKey) {
                this.scene.start(sceneKey);
            }
        });
    }
}

