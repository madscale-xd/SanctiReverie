// credits portion (about)

export default class CredScene extends Phaser.Scene {
    constructor() {
        super('CredScene');
    }

    create() {
        // sfx
        this.clickSFX = this.sound.add('clickSFX', { volume: 0.8 });
        this.hoverSFX = this.sound.add('hoverSFX', { volume: 0.8 });

        // Set the background image to cover the entire scene
        this.add.image(0, 0, 'mainMenuBackground').setOrigin(0);

        // Add the game title image with bobbing effect
        const gameTitle = this.add.image(750, 200, 'gameTitle').setOrigin(0.5);
        this.add.tween({
            targets: gameTitle,
            y: 220, // Change to the desired range for bobbing
            ease: 'Sine.easeInOut',
            duration: 2000,
            yoyo: true,
            repeat: -1
        });

        // Create the back button with hover state
        this.createButton(750, 680, 'back', 'backhover', 'MainMenuScene');

        this.add.text(750, 400, 'Alcove Studios', {
            fontSize: '36px',
            fontFamily: 'antiquity',
            fill: '#d7a04c',
        }).setOrigin(0.5);

        this.add.text(750, 480, 'Lawrenzo Andrey Baldove', {
            fontSize: '18px',
            fontFamily: 'antiquity',
            fill: '#d7a04c',
        }).setOrigin(0.5);

        this.add.text(750, 530, 'Justin Kyle De Castro', {
            fontSize: '18px',
            fontFamily: 'antiquity',
            fill: '#d7a04c',
        }).setOrigin(0.5);

        this.add.text(750, 580, 'Stephanie Pearl Virtudazo', {
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
