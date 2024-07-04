export default class ArenaBossScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ArenaBossScene' });
        this.currColor = "neutral";
        this.currDir = "none";
        this.lastColorChangeTime = -3000; // Track the last time the color was changed
        this.uKeyEnabled = true;
        this.iKeyEnabled = true;
        this.playerInvulnerable = false;
    }
    create() {
        //tilemaps
        this.map = this.make.tilemap({key:"arenaBoss", tileWidth:32, tileHeight:32});
        this.clouds = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'clouds').setOrigin(0.2).setScale(1.6);
        this.mist1 = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'mist').setOrigin(0.2).setScale(1.6).setAlpha(1);
        this.tileset = this.map.addTilesetImage("GP Final Tilemap","arenaTile");
        this.layer3 = this.map.createLayer("floor",this.tileset,0,0);
        this.layer2 = this.map.createLayer("fences",this.tileset,0,0);
        this.layer1 = this.map.createLayer("decorations",this.tileset,0,0);
        this.mist2 = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'mist').setOrigin(0.2).setScale(1.6).setAlpha(0.4);

        this.map.layers.forEach((layer) => {
            layer.tilemapLayer.scale = 2.4;
        });

        //backgrounds
        this.time.addEvent({
            delay: 10, 
            loop: true,
            callback: () => {
                this.mist1.tilePositionY += 0.6; 
                this.mist2.tilePositionY += 1.5; 
                this.clouds.tilePositionY += 0.5;
            }
        })

        //player
        this.playerContainer = this.add.container(735, 360);
        this.physics.world.enable(this.playerContainer);

        this.player = this.physics.add.sprite(0,0, 'player').setOrigin(-0.45, -0.2);
        this.playerContainer.add(this.player);

        this.weapon = this.physics.add.sprite(30,0, 'sword').setScale(0.1).setOrigin(-0.1, -0.15);
        this.playerContainer.add(this.weapon);

        this.cursors = this.input.keyboard.createCursorKeys(); // Create cursor keys for input
        this.wasd = this.input.keyboard.addKeys('W,S,A,D'); // Add WASD keys

        this.jkl = this.input.keyboard.addKeys('J,K,L');
        this.uiop = this.input.keyboard.addKeys('U,I,O,P');

        this.cameras.main.startFollow(this.playerContainer);
        this.cameras.main.setZoom(1.65);

        this.hitboxes = this.physics.add.group();

        //tilemap collisions
        this.layer2.setCollisionBetween(0, 200);
        this.physics.add.collider(this.playerContainer.body, this.layer2);
    }

    update(){
        if (!this.isBouncing && !this.isDashing) {
            // Handle player movement
            if (this.cursors.left.isDown || this.wasd.A.isDown) {
                this.playerContainer.body.setVelocityX(-150);
                this.currDir = 'left';
                this.cdh = 'left';
                this.weapon.x = this.player.x - 20;
                this.weapon.y = this.player.y;
            } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
                this.playerContainer.body.setVelocityX(150);
                this.currDir = 'right';
                this.cdh = 'right';
                this.weapon.x = this.player.x + 20;
                this.weapon.y = this.player.y;
            } else {
                this.playerContainer.body.setVelocityX(0);
                this.cdh = 'none';
            }

            if (this.cursors.up.isDown || this.wasd.W.isDown) {
                this.playerContainer.body.setVelocityY(-150);
                this.currDir = 'up';
                this.cdv = 'up';
                this.weapon.x = this.player.x;
                this.weapon.y = this.player.y - 40;
            } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
                this.playerContainer.body.setVelocityY(150);
                this.currDir = 'down';
                this.cdv = 'down';
                this.weapon.x = this.player.x;
                this.weapon.y = this.player.y + 40;
            } else {
                this.playerContainer.body.setVelocityY(0);
                this.cdv = 'none';
            }
        }

        if (this.uiop.I.isDown && !this.isDashing && this.iKeyEnabled) {
            this.playerDash(this.playerContainer);
        }

        // Handle JKL key presses to change tint with a cooldown
        const currentTime = this.time.now; // Get the current time
        if (currentTime - this.lastColorChangeTime > 3000 ) { // Check if 3 seconds have passed
            if (this.jkl.J.isDown  && this.currColor != 'blue') {
                this.weapon.setTint(0x0000ff); // Blue tint
                this.currColor = 'blue';
                this.lastColorChangeTime = currentTime; // Update the last color change time
            } else if (this.jkl.K.isDown  && this.currColor !='red') {
                this.weapon.setTint(0xff0000); // Red tint
                this.currColor = 'red';
                this.lastColorChangeTime = currentTime; // Update the last color change time
            } else if (this.jkl.L.isDown && this.currColor != 'yellow') {
                this.weapon.setTint(0xffff00); // Yellow tint
                this.currColor = 'yellow';
                this.lastColorChangeTime = currentTime; // Update the last color change time
            }
        }

        if (this.uiop.U.isDown && this.uKeyEnabled) {
            this.createHitbox();
        }

        //player color
        if(this.playerInvulnerable == true){
            this.player.setAlpha(0.25);
        }
    }

    handlePlayerEnemyOverlap(player, enemy) {
        if (enemy.color.includes(this.currColor)) {
            this.enemyBounce(enemy);
        }
    }

    playerBounce(playerContainer) {
        if(this.playerInvulnerable == false){
            const bounceSpeed = 250;
            let initialVelocityX = 0;
            let initialVelocityY = 0;
        
            // Disable player movement
            this.isBouncing = true;
            this.playerInvulnerable = true;

            // Apply bounce velocity based on the player's current direction
            if (this.currDir == 'left') {
                initialVelocityX = bounceSpeed;
                playerContainer.body.setVelocityX(initialVelocityX);
                this.weapon.x == this.player.x + 30;
            } else if (this.currDir == 'right') {
                initialVelocityX = -bounceSpeed;
                playerContainer.body.setVelocityX(initialVelocityX);
            } else if (this.currDir == 'up') {
                initialVelocityY = bounceSpeed;
                playerContainer.body.setVelocityY(initialVelocityY);
            } else if (this.currDir == 'down') {
                initialVelocityY = -bounceSpeed;
                playerContainer.body.setVelocityY(initialVelocityY);
            }
        
            // Reset the player's velocity after 0.25 seconds
            this.time.delayedCall(250, () => {
                if (initialVelocityX !== 0) {
                    playerContainer.body.setVelocityX(0);
                }
                if (initialVelocityY !== 0) {
                    playerContainer.body.setVelocityY(0);
                }
                this.isBouncing = false; // Enable player movement again
            }, [], this);

            this.time.delayedCall(750, () => {
                this.playerInvulnerable = false; // enable player dmg again
                this.player.setAlpha(1);
            }, [], this);
        }
    }

// Function to handle creation and destruction of hitbox
    createHitbox() {
        let hitbox;

        if (this.currDir === 'left') {
            hitbox = this.physics.add.sprite(this.playerContainer.body.x - 30, this.playerContainer.body.y, 'hitbox').setOrigin(0, 0.15);
        } else if (this.currDir === 'right') {
            hitbox = this.physics.add.sprite(this.playerContainer.body.x + 60, this.playerContainer.body.y, 'hitbox').setOrigin(0, 0.15);
        } else if (this.currDir === 'up') {
            hitbox = this.physics.add.sprite(this.playerContainer.body.x, this.playerContainer.body.y - 30, 'hitboxH').setOrigin(0.15, 0);
        } else if (this.currDir === 'down') {
            hitbox = this.physics.add.sprite(this.playerContainer.body.x, this.playerContainer.body.y + 60, 'hitboxH').setOrigin(0.15, 0);
        }

        // Add hitbox to the container or group
        this.hitboxes.add(hitbox);

        // Enable cooldown
        this.uKeyEnabled = false;

        // Set a delayed callback to re-enable the ability after cooldown
        this.time.delayedCall(500, () => {
            this.uKeyEnabled = true;
        }, [], this);
        
        this.time.delayedCall(250, () => {
            if (hitbox && hitbox.active) {
                hitbox.destroy();
            }
        }, [], this);
    }

    playerDash(playerContainer) {
        const dashSpeed = 500;
        let initialVelocityX = 0;
        let initialVelocityY = 0;
    
        // Disable player movement
        this.isDashing = true;
        this.iKeyEnabled = false;
        this.playerInvulnerable = true;

        // Apply dash velocity based on the player's current direction
        if (this.cdh == 'left') {
            initialVelocityX = -dashSpeed;
            playerContainer.body.setVelocityX(initialVelocityX);
            this.weapon.x == this.player.x + 30;
        } else if (this.cdh == 'right') {
            initialVelocityX = dashSpeed;
            playerContainer.body.setVelocityX(initialVelocityX);
        } if (this.cdv == 'up') {
            initialVelocityY = -dashSpeed;
            playerContainer.body.setVelocityY(initialVelocityY);
        } else if (this.cdv == 'down') {
            initialVelocityY = dashSpeed;
            playerContainer.body.setVelocityY(initialVelocityY);
        }
    
        // Reset the player's velocity after 0.5 seconds
        this.time.delayedCall(250, () => {
            if (initialVelocityX !== 0) {
                playerContainer.body.setVelocityX(0);
            }
            if (initialVelocityY !== 0) {
                playerContainer.body.setVelocityY(0);
            }
            this.isDashing = false; // Enable player movement again
        }, [], this);

        this.time.delayedCall(500, () => {
            this.playerInvulnerable = false;
            this.player.setAlpha(1);
        }, [], this);

        // Set a delayed callback to re-enable the ability after cooldown
        this.time.delayedCall(750, () => {
            this.iKeyEnabled = true;
        }, [], this);
    }
}