
export default class TestScene extends Phaser.Scene {
    constructor (){
        super({ key: 'TestScene' });
        this.currColor = "neutral";
        this.currDir = "none";
        this.lastColorChangeTime = -3000; // Track the last time the color was changed
        this.uKeyEnabled = true;
        this.iKeyEnabled = true;
        this.playerInvulnerable = false;
    }
    
    create(){
        this.add.image(-400, -250, 'forest').setScale(2).setOrigin(0);

        this.playerContainer = this.add.container(735, 360);
        this.physics.world.enable(this.playerContainer);
        this.playerContainer.body.setCollideWorldBounds(true);

        this.player = this.physics.add.sprite(0,0, 'player').setOrigin(-0.45, -0.2);
        this.player.setCollideWorldBounds(true);
        this.playerContainer.add(this.player);

        this.weapon = this.physics.add.sprite(30,0, 'sword').setScale(0.1).setOrigin(-0.1, -0.15);
        this.playerContainer.add(this.weapon);

        // Create enemy group
        this.enemies = this.physics.add.group();

        this.hitboxes = this.physics.add.group();

        let normalEnemy = this.physics.add.sprite(635, 360, 'player');
        normalEnemy.setImmovable(true);
        normalEnemy.color = ['blue', 'red', 'yellow'];
        normalEnemy.setTint(0xd3d3d3);
        this.enemies.add(normalEnemy);

        let whiteEnemy = this.physics.add.sprite(735, 360, 'player');
        whiteEnemy.setImmovable(true);
        whiteEnemy.color = ['white'];
        whiteEnemy.setTint(0xffffff);
        this.enemies.add(whiteEnemy);

        // Create blue enemy
        let blueEnemy = this.physics.add.sprite(835, 360, 'player');
        blueEnemy.setImmovable(true);
        blueEnemy.setTint(0x0000ff);
        blueEnemy.color = ['blue'];
        this.enemies.add(blueEnemy);

        // Create red enemy
        let redEnemy = this.physics.add.sprite(935, 360, 'player');
        redEnemy.setImmovable(true);
        redEnemy.setTint(0xff0000);
        redEnemy.color = ['red'];
        this.enemies.add(redEnemy);

        // Create yellow enemy
        let yellowEnemy = this.physics.add.sprite(1035, 360, 'player');
        yellowEnemy.setImmovable(true);
        yellowEnemy.setTint(0xffff00);
        yellowEnemy.color = ['yellow'];
        this.enemies.add(yellowEnemy);

        this.physics.add.overlap(this.weapon, this.enemies, this.handlePlayerEnemyOverlap, null, this);
        this.physics.add.overlap(this.hitboxes, this.enemies, this.handlePlayerEnemyOverlap, null, this);
        this.physics.add.collider(this.player, this.enemies, () => {
            this.playerBounce(this.playerContainer);
        }, null, this);

        this.cursors = this.input.keyboard.createCursorKeys(); // Create cursor keys for input
        this.wasd = this.input.keyboard.addKeys('W,S,A,D'); // Add WASD keys

        this.jkl = this.input.keyboard.addKeys('J,K,L');
        this.uiop = this.input.keyboard.addKeys('U,I,O,P');

        this.cameras.main.startFollow(this.playerContainer);
        this.cameras.main.setZoom(2);
    }
    update() {
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

    enemyBounce(enemy) {
            const bounceSpeed = 250;
            let initialVelocityX = 0;
            let initialVelocityY = 0;
        
            // Apply bounce velocity based on the player's current direction
            if (this.currDir == 'left') {
                initialVelocityX = -bounceSpeed;
                enemy.setVelocityX(initialVelocityX);
            } else if (this.currDir == 'right') {
                initialVelocityX = bounceSpeed;
                enemy.setVelocityX(initialVelocityX);
            } else if (this.currDir == 'up') {
                initialVelocityY = -bounceSpeed;
                enemy.setVelocityY(initialVelocityY);
            } else if (this.currDir == 'down') {
                initialVelocityY = bounceSpeed;
                enemy.setVelocityY(initialVelocityY);
            }
        
            // Reset the enemy's velocity after 0.25 seconds
            this.time.delayedCall(250, () => {
                if (initialVelocityX !== 0) {
                    enemy.setVelocityX(0);
                }
                if (initialVelocityY !== 0) {
                    enemy.setVelocityY(0);
                }
            }, [], this);
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

        // Set a delayed callback to re-enable the ability after cooldown
        this.time.delayedCall(750, () => {
            this.iKeyEnabled = true;
        }, [], this);
    }
}
