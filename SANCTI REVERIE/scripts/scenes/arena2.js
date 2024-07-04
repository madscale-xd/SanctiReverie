export default class Arena2Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Arena2Scene' });
        this.currColor = "neutral";
        this.currDir = "none";
        this.lastColorChangeTime = -3000; // Track the last time the color was changed
        this.uKeyEnabled = true;
        this.iKeyEnabled = true;
        this.playerInvulnerable = false;
        this.SeraphimSpawnRate = 10000;
    }
    create() {
        //tilemaps
        this.map = this.make.tilemap({key:"arena2", tileWidth:32, tileHeight:32});

        // Calculate aspect ratio of the screen
        
        this.cameraWidth = this.cameras.main.width;
        this.cameraHeight = this.cameras.main.height;

        const aspectRatio = this.cameraWidth / this.cameraHeight;

        // Determine the scale and position of the clouds
        let cloudsWidth = this.cameraWidth;
        let cloudsHeight = this.cameraHeight;

        // Adjust clouds size to maintain aspect ratio
        if (aspectRatio > 1) { // Landscape orientation
            cloudsWidth *= aspectRatio;
        } else { // Portrait orientation
            cloudsHeight /= aspectRatio;
        }

        this.clouds = this.add.tileSprite(0, 0, cloudsWidth, cloudsHeight, 'clouds')
            .setOrigin(0.3, 0.5)
            .setScale(1);
        this.mist1 = this.add.tileSprite(0, 0, cloudsWidth, cloudsHeight, 'mist')
        .setOrigin(0.3, 0.5)
        .setScale(1).setAlpha(0.6);
        this.tileset = this.map.addTilesetImage("GP Final Tilemap","arenaTile");
        this.layer3 = this.map.createLayer("floor",this.tileset,0,0);
        this.layer2 = this.map.createLayer("fences",this.tileset,0,0);
        this.layer1 = this.map.createLayer("decorations",this.tileset,0,0);

        this.map.layers.forEach((layer) => {
            layer.tilemapLayer.scale = 2.4;
        });

        //backgrounds
        this.time.addEvent({
            delay: 10, 
            loop: true,
            callback: () => {
                this.mist1.tilePositionY += 0.8; 
                this.clouds.tilePositionY += 0.5;
            }
        })

        //player
        this.playerContainer = this.add.container(735, 360);
        this.physics.world.enable(this.playerContainer);

        this.player = this.physics.add.sprite(0,0, 'player').setOrigin(-0.02, 0.15);
        this.playerContainer.add(this.player);

        this.anims.create({
            key: 'moveDown',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        // Create the animation for moving up
        this.anims.create({
            key: 'moveUp',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        // Create the animation for idle
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 6,
            repeat: -1
        });

        // Create the animation for moving right
        this.anims.create({
            key: 'moveRight',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 8,
            repeat: -1
        });

        // Create the animation for moving left
        this.anims.create({
            key: 'moveLeft',
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 19 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'slashLeft',
            frames: this.anims.generateFrameNumbers('slashLeft', { start: 4, end: 0}),
            frameRate: 16,
            repeat: 0
        });


        this.anims.create({
            key: 'slashRight',
            frames: this.anims.generateFrameNumbers('slashRight', { start: 0, end: 4 }),
            frameRate: 16,
            repeat: 0
        });

        this.anims.create({
            key: 'slashDown',
            frames: this.anims.generateFrameNumbers('slashDown', { start: 0, end: 4 }),
            frameRate: 16,
            repeat: 0
        });

        this.anims.create({
            key: 'slashUp',
            frames: this.anims.generateFrameNumbers('slashUp', { start: 4, end: 0 }),
            frameRate: 16,
            repeat: 0
        });

        this.weapon = this.physics.add.sprite(30,0, 'sword').setScale(0.1).setOrigin(-0.1, -0.15);
        this.playerContainer.add(this.weapon);
        this.slashLeft = this.physics.add.sprite(30,0, 'slashLeft').setScale(1.5).setOrigin(0.7, 0.2);
        this.playerContainer.add(this.slashLeft);
        this.slashRight = this.physics.add.sprite(30,0, 'slashRight').setScale(1.5).setOrigin(-0.55, 0.2);
        this.playerContainer.add(this.slashRight);
        this.slashUp = this.physics.add.sprite(30,0, 'slashUp').setScale(1.5).setOrigin(0.3, 0.75);
        this.playerContainer.add(this.slashUp);
        this.slashDown = this.physics.add.sprite(30,0, 'slashDown').setScale(1.5).setOrigin(0.3, -0.75);
        this.playerContainer.add(this.slashDown);

        this.cursors = this.input.keyboard.createCursorKeys(); // Create cursor keys for input
        this.wasd = this.input.keyboard.addKeys('W,S,A,D'); // Add WASD keys

        this.jkl = this.input.keyboard.addKeys('J,K,L');
        this.uiop = this.input.keyboard.addKeys('U,I,O,P');

        this.cameras.main.startFollow(this.playerContainer);
        this.cameras.main.setZoom(1.65);// 1.65 as default;

        this.hitboxes = this.physics.add.group();

        //Seraphims (Seraphim)
        this.Seraphims = this.physics.add.group();

        this.time.addEvent({
            delay: this.SeraphimSpawnRate,
            callback: this.seraSpawn,
            callbackScope: this,
            loop: true
        });

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('seraphim', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'proj',
            frames: this.anims.generateFrameNumbers('seraProj', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        })

        this.seraProjs = this.physics.add.group();

        //tilemap collisions
        this.layer2.setCollisionBetween(0, 200);
        this.physics.add.collider(this.playerContainer.body, this.layer2);

        //collisions and damage
        this.physics.add.overlap(this.weapon, this.Seraphims, this.handlePlayerEnemyOverlap, null, this);
        this.physics.add.overlap(this.hitboxes, this.Seraphims, this.handlePlayerEnemyOverlap, null, this);
        this.physics.add.collider(this.player, this.Seraphims, () => {
            this.playerBounce(this.playerContainer, this.Seraphims);
        }, null, this);
        this.physics.add.overlap(this.player, this.seraProjs, (player, projectile) => {
                this.playerBounce(this.playerContainer, projectile);
        });

        //audio files
        this.dashSFX = this.sound.add('dashSFX', {volume: 0.7});
        this.slashSFX = this.sound.add('slashSFX', {volume: 1.5});
        this.painSFX = this.sound.add('painSFX', {volume: 1.3});
        this.fireballSFX = this.sound.add('fireballSFX', {volume: 0.7});
        this.blueSFX = this.sound.add('blueSFX', {volume: 1.2});
        this.redSFX = this.sound.add('redSFX', {volume: 1.2});
        this.yellowSFX = this.sound.add('yellowSFX', {volume: 1.2});
        this.playBGM = this.sound.add('playBGM', {volume: 0.4, loop:true});
        this.playBGM.play();
    }

    update(){
         // Set clouds position based on camera scroll
        const scrollX = this.cameras.main.scrollX;
        const scrollY = this.cameras.main.scrollY;

        // Adjust clouds position relative to camera
        this.clouds.x = scrollX + this.cameraWidth / 2;
        this.clouds.y = scrollY + this.cameraHeight / 2;
        this.mist1.x = scrollX + this.cameraWidth / 2;
        this.mist1.y = scrollY + this.cameraHeight / 2;
        if (!this.isBouncing && !this.isDashing) {
            // Handle player movement
            this.slashRight.x = this.player.x + 20;
            this.slashLeft.x = this.player.x - 20;
            this.slashDown.x = this.player.x
            this.slashUp.x = this.player.x
            this.slashRight.y = this.player.y
            this.slashLeft.y = this.player.y
            this.slashDown.y = this.player.y + 40;
            this.slashUp.y = this.player.y - 40;
            if (this.cursors.left.isDown || this.wasd.A.isDown) {
                this.playerContainer.body.setVelocityX(-180);
                this.player.anims.play('moveLeft', true);
                this.currDir = 'left';
                this.cdh = 'left';
                this.weapon.x = this.player.x - 20;
                this.weapon.y = this.player.y;
            } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
                this.playerContainer.body.setVelocityX(180);
                this.player.anims.play('moveRight', true);
                this.currDir = 'right';
                this.cdh = 'right';
                this.weapon.x = this.player.x + 20;
                this.weapon.y = this.player.y;
            } else {
                this.playerContainer.body.setVelocityX(0);
                this.cdh = 'none';
            }

            if (this.cursors.up.isDown || this.wasd.W.isDown) {
                this.playerContainer.body.setVelocityY(-180);
                if(this.cdh == 'right'){
                    this.player.anims.play('moveRight', true);
                }else if(this.cdh == 'left'){
                    this.player.anims.play('moveLeft', true);
                }else{
                    this.player.anims.play('moveUp', true);
                }
                this.currDir = 'up';
                this.cdv = 'up';
                this.weapon.x = this.player.x;
                this.weapon.y = this.player.y - 40;
            } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
                this.playerContainer.body.setVelocityY(180);
                if(this.cdh == 'right'){
                    this.player.anims.play('moveRight', true);
                }else if(this.cdh == 'left'){
                    this.player.anims.play('moveLeft', true);
                }else{
                    this.player.anims.play('moveDown', true);
                }
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
            console.log(this.playerContainer.x, this.playerContainer.y);
        }

        // Handle JKL key presses to change tint with a cooldown
        const currentTime = this.time.now; // Get the current time
        if (currentTime - this.lastColorChangeTime > 3000 ) { // Check if 3 seconds have passed
            if (this.jkl.J.isDown  && this.currColor != 'blue') {
                this.blueSFX.play();
                this.weapon.setTint(0x0000ff); // Blue tint
                this.currColor = 'blue';
                this.lastColorChangeTime = currentTime; // Update the last color change time
            } else if (this.jkl.K.isDown  && this.currColor !='red') {
                this.redSFX.play();
                this.weapon.setTint(0xff0000); // Red tint
                this.currColor = 'red';
                this.lastColorChangeTime = currentTime; // Update the last color change time
            } else if (this.jkl.L.isDown && this.currColor != 'yellow') {
                this.yellowSFX.play();
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

        //enemies
        this.Seraphims.children.each((seraphim) => {
            seraphim.anims.play('fly', true);
        }, this);

         // Remove projectiles that are out of the screen
        this.seraProjs.children.each((projectile) => {
            if (projectile.y > 1200 || projectile.y < -400) { // Assuming the game height is 600
                projectile.destroy();
            }
        }, this);
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
    
        // Check if the enemy is currently vulnerable to damage
        if (!enemy.isInvulnerable && enemy.active) {
            if (enemy.class === "seraphim") {
                this.seraDamage(enemy, 1); // Adjust as per your damage function
            }
            enemy.setAlpha(0.5);
    
            // Shake duration and intensity
            const shakeDuration = 100; // Duration in milliseconds
            const shakeIntensity = 5; // Movement range in pixels
    
            // Set enemy invulnerable to damage
            enemy.isInvulnerable = true;
    
            // Shake effect using Phaser's tween
            this.tweens.add({
                targets: enemy,
                x: enemy.x + Phaser.Math.Between(-shakeIntensity, shakeIntensity),
                y: enemy.y + Phaser.Math.Between(-shakeIntensity, shakeIntensity),
                duration: shakeDuration,
                ease: 'Power1',
                yoyo: true, // Makes the sprite return to its original position smoothly
                repeat: 0, // Repeat 0 times (1 play in total)
                onComplete: () => {
                    // Reset position to the original position after shaking
                    enemy.setPosition(enemy.x, enemy.y);
    
                    // Reset the enemy's velocity after a short delay
                    this.time.delayedCall(250, () => {
                        if (initialVelocityX !== 0) {
                            enemy.setVelocityX(0);
                        }
                        if (initialVelocityY !== 0) {
                            enemy.setVelocityY(0);
                        }
                    }, [], this);
    
                    // Allow the enemy to take damage again after the invulnerability duration
                    this.time.delayedCall(500, () => {
                        enemy.isInvulnerable = false;
                        enemy.setAlpha(1);
                    }, [], this);
                }
            });
        }
    }

    playerBounce(playerContainer, enemy) {
        if(this.playerInvulnerable == false){
            if(enemy.class == "projectile"){
                enemy.destroy();
            }
            this.painSFX.play();
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
        this.slashSFX.play();
        let hitbox;
        
        if (this.currDir === 'left') {
            hitbox = this.physics.add.sprite(this.playerContainer.body.x - 70, this.playerContainer.body.y, 'hitbox').setOrigin(0, 0.2).setScale(1.5).setVisible(false);
            this.slashLeft.anims.play('slashLeft', true);
        } else if (this.currDir === 'right') {
            hitbox = this.physics.add.sprite(this.playerContainer.body.x + 60, this.playerContainer.body.y, 'hitbox').setOrigin(0, 0.2).setScale(1.5).setVisible(false);
            this.slashRight.anims.play('slashRight', true);
        } else if (this.currDir === 'up') {
            hitbox = this.physics.add.sprite(this.playerContainer.body.x, this.playerContainer.body.y - 80, 'hitboxH').setOrigin(0.3, 0.2).setScale(1.5).setVisible(false);
            this.slashUp.anims.play('slashUp', true);
        } else if (this.currDir === 'down') {
            hitbox = this.physics.add.sprite(this.playerContainer.body.x, this.playerContainer.body.y + 70, 'hitboxH').setOrigin(0.3, -0.37).setScale(1.5).setVisible(false);
            this.slashDown.anims.play('slashDown', true);
        } else {
            hitbox = this.physics.add.sprite(this.playerContainer.body.x, this.playerContainer.body.y + 70, 'hitboxH').setOrigin(0.3, -0.37).setScale(1.5).setVisible(false);
            this.slashDown.anims.play('slashDown', true);
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
        this.dashSFX.play();
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
        this.time.delayedCall(1500, () => {
            this.iKeyEnabled = true;
        }, [], this);
    }

    seraShoot(seraphim) {
        if (!seraphim.active) {
            return; // Don't shoot if Seraphim is not active (i.e., destroyed or inactive)
        }
        this.fireballSFX.play();

        const player = this.playerContainer; // Assuming 'player' is your player object
    
        // Calculate angle from Seraphim to player
        const angle = Phaser.Math.Angle.BetweenPoints(seraphim, player);
    
        // Create a bullet at Seraphim's position
        const projectile = this.seraProjs.create(seraphim.x, seraphim.y, 'seraProj').setOrigin(-0.55, -0.55).setScale(0.7);
        projectile.anims.play('proj', true);

        projectile.class = "projectile";
    
        // Set velocity based on angle towards player
        const speed = 200; // Adjust speed as needed
        projectile.setVelocityX(Math.cos(angle) * speed);
        projectile.setVelocityY(Math.sin(angle) * speed);
    
        // Optionally, store a reference to the projectile on the seraphim
        seraphim.projectile = projectile;
    }

    seraSpawn() {
        // Generate random x and y coordinates for the enemy spawn position
        const centerX = Phaser.Math.Between(200, 1300);
        let centerY;

        // Randomly choose between different ranges
        const randomChoice = Phaser.Math.Between(1, 2); // Example: choose between 1 to 4

        if (randomChoice === 1) {
            centerY = Phaser.Math.Between(60, 100); // Range 1
        } else if(randomChoice === 2) {
            centerY = Phaser.Math.Between(600, 650); // Default or Range 4
        }
    
        // Generate a random radius for the circular path
        const radius = Phaser.Math.Between(50, 150); // Random radius between 50 and 150
    
        // Create a new enemy at the center position
        const seraphim = this.Seraphims.create(centerX, centerY, 'seraphim').setOrigin(-0.02, 0.15).setScale(0.6);  
        seraphim.class = "seraphim";
    
        const tintChoice = Phaser.Math.Between(1, 3); // 1 = Red, 2 = Blue, 3 = Yellow, 4 = Unclored (all colors vulne)
    
        // Apply tint based on random choice
        switch (tintChoice) {
            case 1:
                seraphim.setTint(0xff0000); // Red tint
                seraphim.color = ['red'];
                break;
            case 2:
                seraphim.setTint(0x0000ff); // Blue tint
                seraphim.color = ['blue'];
                break;
            case 3:
                seraphim.setTint(0xffff00); // Yellow tint
                seraphim.color = ['yellow'];
                break;
            case 4:             //No tint
                seraphim.color = ['red','blue','yellow'];
                break;
            default:
                break;
        }

        seraphim.hp = 2;

        seraphim.setActive(false).setAlpha(0.5);
        this.time.delayedCall(1000, () => {
            seraphim.setActive(true).setAlpha(1);
        });
    
        // Set initial angle for circular movement
        let angle = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360)); // Random initial angle
    
        this.time.addEvent({
            delay: 50, // Adjust the delay to change speed of rotation
            loop: true,
            callback: () => {
                // Calculate new position on the circular path
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
    
                // Update seraphim position
                seraphim.setPosition(x, y);
    
                // Increment angle for next frame
                angle += Phaser.Math.DegToRad(2.5); // Adjust angular speed (2 degrees per frame)
            },
            callbackScope: this
        });
    
        this.time.addEvent({
            delay: 2500, 
            loop: true,
            callback: () => this.seraShoot(seraphim),
            callbackScope: this,
            loop: true
        });
    }

    seraDamage(seraphim, damageAmount) {
        seraphim.hp -= damageAmount;
        console.log(seraphim.hp);
        if (seraphim.hp <= 0) {
            // Handle seraphim defeat or destruction
            this.destroySeraphim(seraphim);
        }
    }
    
    destroySeraphim(seraphim) {
        seraphim.destroy();
    }
}