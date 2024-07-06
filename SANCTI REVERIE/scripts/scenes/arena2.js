export default class Arena2Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Arena2Scene' });
        this.currColor = "blue";
        this.currDir = "none";
        this.lastColorChangeTime = -3000; // Track the last time the color was changed
        this.uKeyEnabled = true;
        this.iKeyEnabled = true;
        this.playerInvulnerable = false;
        this.SeraphimSpawnRate = 20000;        
        this.ThroneSpawnRate = 5000;
        this.handSpawnRate = 100000;            //set to 500 at cutscene
        this.controlsEnabled = true;
        this.eligiusMovable = false;
        this.orbSpawnRate = 8000;
        this.score = 0;
        this.scoreText;
        this.playerHp = 5;
        this.destructionSFXPlayed = false;
    }
    create() {
        //reset
        this.currColor = "blue";
        this.currDir = "none";
        this.lastColorChangeTime = -3000; // Track the last time the color was changed
        this.uKeyEnabled = true;
        this.iKeyEnabled = true;
        this.playerInvulnerable = false;
        this.SeraphimSpawnRate = 20000;        
        this.ThroneSpawnRate = 5000;
        this.handSpawnRate = 100000;            //set to 500 at cutscene
        this.controlsEnabled = true;
        this.eligiusMovable = false;
        this.orbSpawnRate = 8000;
        this.score = 0;
        this.scoreText;
        this.playerHp = 5;
        this.isBouncing = false;
        this.isDashing = false;
        this.destructionSFXPlayed = false;
        //tilemaps
        this.map = this.make.tilemap({key:"arenaFinal", tileWidth:32, tileHeight:32});

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
        this.tileset = this.map.addTilesetImage("arenatilemapupdated","arenaTile");
        this.layer4 = this.map.createLayer("floor",this.tileset,0,0);
        this.layer3 = this.map.createLayer("fences",this.tileset,0,0);
        this.layer2 = this.map.createLayer("decorations",this.tileset,0,0);
        this.layer1 = this.map.createLayer("decorations2",this.tileset,0,0);

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
        this.player.health = 5;
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
            key: 'weaponBlue',
            frames: this.anims.generateFrameNumbers('swordd', { start: 2, end: 2 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'weaponRed',
            frames: this.anims.generateFrameNumbers('swordd', { start: 0, end: 0 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'weaponYellow',
            frames: this.anims.generateFrameNumbers('swordd', { start: 1, end: 1 }),
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
            frames: this.anims.generateFrameNumbers('slashRight', { start: 0, end: 5 }),
            frameRate: 16,
            repeat: 0
        });

        this.anims.create({
            key: 'slashDown',
            frames: this.anims.generateFrameNumbers('slashDown', { start: 0, end: 5 }),
            frameRate: 16,
            repeat: 0
        });

        this.anims.create({
            key: 'slashUp',
            frames: this.anims.generateFrameNumbers('slashUp', { start: 4, end: 0 }),
            frameRate: 16,
            repeat: 0
        });

        

        this.anims.create({
            key: 'heart5',
            frames: this.anims.generateFrameNumbers('heart', { start: 0, end: 0 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'heart4',
            frames: this.anims.generateFrameNumbers('heart', { start: 1, end: 1 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'heart3',
            frames: this.anims.generateFrameNumbers('heart', { start: 2, end: 2 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'heart2',
            frames: this.anims.generateFrameNumbers('heart', { start: 3, end: 3 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'heart1',
            frames: this.anims.generateFrameNumbers('heart', { start: 4, end: 4}),
            frameRate: 4,
            repeat: -1
        })

        this.weapon = this.physics.add.sprite(30,0, 'swordd').setScale(0.5).setOrigin(-0.1, -0.15);
        this.weapon.anims.play('weaponBlue');
        this.playerContainer.add(this.weapon);
        this.slashLeft = this.physics.add.sprite(30,0, 'slashLeft').setScale(1.5).setOrigin(0.7, 0.2);
        this.playerContainer.add(this.slashLeft);
        this.slashRight = this.physics.add.sprite(30,0, 'slashRight').setScale(1.5).setOrigin(-0.55, 0.2);
        this.playerContainer.add(this.slashRight);
        this.slashUp = this.physics.add.sprite(30,0, 'slashUp').setScale(1.5).setOrigin(0.3, 0.75);
        this.playerContainer.add(this.slashUp);
        this.slashDown = this.physics.add.sprite(30,0, 'slashDown').setScale(1.5).setOrigin(0.3, -0.75);
        this.playerContainer.add(this.slashDown);

        this.slashRight.setTint(0x0000ff);
        this.slashLeft.setTint(0x0000ff);
        this.slashUp.setTint(0x0000ff);
        this.slashDown.setTint(0x0000ff);

        this.cursors = this.input.keyboard.createCursorKeys(); // Create cursor keys for input
        this.wasd = this.input.keyboard.addKeys('W,S,A,D'); // Add WASD keys

        this.jkl = this.input.keyboard.addKeys('J,K,L');
        this.uiop = this.input.keyboard.addKeys('U,I,O,P');

        this.cameras.main.startFollow(this.playerContainer);
        this.cameras.main.setZoom(1.65);// 1.65 as default; ZOOM

        // Adding the score text and score bar with correct depths
        this.scorebar = this.add.image(1050, 210, 'scorebar').setScale(0.8).setDepth(5).setScrollFactor(0);
        this.scoreText = this.add.text(990, 200, 'Score: 0', { 
            fontFamily: 'antiquity', 
            fontSize: '18px',  
            fill: '#fbeae3', 
        }).setOrigin(0).setDepth(10).setScrollFactor(0);

        this.portrait = this.add.image(320, 160, 'portrait').setScale(0.4).setDepth(1);
        this.hearts = this.add.sprite(465, 160, 'heart').setScale(0.3).setDepth(1);
        this.hearts.anims.play('heart5');

        // Creating the UI container and adding elements to it
        this.uiContainer = this.add.container(50, 50);
        this.uiContainer.add(this.hearts);
        this.uiContainer.add(this.portrait);
        this.uiContainer.setDepth(10).setScrollFactor(0);


        this.hitboxes = this.physics.add.group();

        //Seraphims (Seraphim)
        this.Seraphims = this.physics.add.group();

        //Thrones (Throne)
        this.Thrones = this.physics.add.group();

        this.seraEvent = this.time.addEvent({
            delay: this.SeraphimSpawnRate,
            callback: this.seraSpawn,
            callbackScope: this,
            loop: true
        });

        this.throneEvent = this.time.addEvent({
            delay: this.ThroneSpawnRate,
            callback: this.throneSpawn,
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 60000,
            callback: this.spawnFaster,
            callbackScope: this
        });

        this.time.addEvent({
            delay: 2000,
            callback: this.spawnEligiusCutscene,
            callbackScope: this
        });

        this.time.addEvent({
            delay: 1000,
            callback: this.enableColliders,
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 1500,
            callback: this.enableCollidersHands,
            callbackScope: this,
            loop: true
        });

        this.scoreTimer = this.time.addEvent({
            delay: 1000, // 1 second
            callback: () => {
              this.score += 10;
              this.scoreText.setText('Score: ' + this.score);
            },
            loop: true
        });

        this.anims.create({
            key: 'flyDefault',
            frames: this.anims.generateFrameNumbers('seraphim', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'flyBlue',
            frames: this.anims.generateFrameNumbers('seraphimBlue', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'flyRed',
            frames: this.anims.generateFrameNumbers('seraphimRed', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'flyYellow',
            frames: this.anims.generateFrameNumbers('seraphimYellow', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'bounceDefault',
            frames: this.anims.generateFrameNumbers('throne', { start: 0, end: 9 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'bounceBlue',
            frames: this.anims.generateFrameNumbers('throneBlue', { start: 0, end: 9 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'bounceRed',
            frames: this.anims.generateFrameNumbers('throneRed', { start: 0, end: 9 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'bounceYellow',
            frames: this.anims.generateFrameNumbers('throneYellow', { start: 0, end: 9 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'eligiusIdle',
            frames: this.anims.generateFrameNumbers('eligius', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'eligiusSpell',
            frames: this.anims.generateFrameNumbers('eligius', { start: 4, end: 12 }),
            frameRate: 16,
            repeat: 0
        })

        this.anims.create({
            key: 'candleblue',
            frames: this.anims.generateFrameNumbers('candleblue', { start: 0, end: 8 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'candlered',
            frames: this.anims.generateFrameNumbers('candlered', { start: 0, end: 8 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'candleyellow',
            frames: this.anims.generateFrameNumbers('candleyellow', { start: 0, end: 8 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'handAttack',
            frames: this.anims.generateFrameNumbers('handAttack', { start: 0, end: 6 }),
            frameRate: 7,
            repeat: 0
        })

        this.anims.create({
            key: 'bossOrb',
            frames: this.anims.generateFrameNumbers('bossOrb', { start: 1, end: 8}),
            frameRate: 16,
            repeat: -1
        })

        this.anims.create({
            key: 'bossLaser',
            frames: this.anims.generateFrameNumbers('bossLaser', { start: 0, end: 2 }),
            frameRate: 24,
            repeat: 0
        })

        this.anims.create({
            key: 'proj',
            frames: this.anims.generateFrameNumbers('seraProj', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'proj2',
            frames: this.anims.generateFrameNumbers('seraProj', { start: 0, end: 2 }),
            frameRate: 4,
            repeat: -1
        })

        this.seraProjs = this.physics.add.group();

        //tilemap collisions
        this.layer3.setCollisionBetween(0, 200);
        this.physics.add.collider(this.playerContainer.body, this.layer3);
        this.physics.add.collider(this.Thrones, this.layer3, this.throneTileCollision, null, this);
        //collisions and damage
        this.physics.add.overlap(this.weapon, this.Seraphims, this.handlePlayerEnemyOverlap, null, this);
        this.physics.add.overlap(this.hitboxes, this.Seraphims, this.handlePlayerEnemyOverlap, null, this);
        this.physics.add.overlap(this.weapon, this.Thrones, this.handlePlayerEnemyOverlap, null, this);
        this.physics.add.overlap(this.hitboxes, this.Thrones, this.handlePlayerEnemyOverlap, null, this);
        
        this.physics.add.overlap(this.player, this.seraProjs, (player, projectile) => {
                this.playerBounce(this.playerContainer, projectile);
        });
        
        //eligius
        this.eligius = this.physics.add.sprite(610, 540, 'eligius').setScale(1).setOrigin(-0.1, -0.15).setActive(false).setVisible(false);
        this.eligius.anims.play('eligiusIdle');
        this.eligiusHp = 50;

        this.orb1 = this.physics.add.sprite(610, 540, 'seraProj').setScale(0.8).setOrigin(-1.5, -3.8); // Replace 'orbTexture' with the actual texture key for the orb
        this.orb1.anims.play('proj');
        this.orb1.setVisible(false);
        this.orb2 = this.physics.add.sprite(610, 540, 'seraProj').setScale(0.8).setOrigin(-1.5, -3.8);
        this.orb2.anims.play('proj');
        this.orb2.setVisible(false);

        this.orbRadius = 200; // Radius of the orbit
        this.orbSpeed = 0.015; // Speed of the orbit (radians per frame)
        this.orbAngle1 = 0; // Initial angle for orb1
        this.orbAngle2 = Math.PI; // Initial angle for orb2 (opposite to orb1)
        
        this.physics.add.overlap(this.weapon, this.eligius, this.handleEligius, null, this);
        this.physics.add.overlap(this.hitboxes, this.eligius, this.handleEligius, null, this);

        this.Hands = this.physics.add.group();

        // Time interval for changing direction (in milliseconds)
        this.changeDirectionInterval = 2000; // Change direction every 1 second

        // Timer to track when to change direction
        this.timeSinceLastChange = 0;
        this.maxDistance = 250;

        //audio files
        this.dashSFX = this.sound.add('dashSFX', {volume: 0.7});
        this.slashSFX = this.sound.add('slashSFX', {volume: 1.5});
        this.painSFX = this.sound.add('painSFX', {volume: 1.3});
        this.fireballSFX = this.sound.add('fireballSFX', {volume: 0.7});
        this.laserSFX = this.sound.add('laserSFX', {volume: 1.2});
        this.blueSFX = this.sound.add('blueSFX', {volume: 1.2});
        this.redSFX = this.sound.add('redSFX', {volume: 1.2});
        this.yellowSFX = this.sound.add('yellowSFX', {volume: 1.2});
        this.playBGM = this.sound.add('playBGM', {volume: 0.4, loop:true});
        this.bossBGM = this.sound.add('bossBGM', {volume: 0.4, loop:true});
        this.destructionSFX = this.sound.add('destructionSFX', {volume: 0.4});
        this.playBGM.play();
    }

    update(time, delta){
         // Set clouds position based on camera scroll
        const scrollX = this.cameras.main.scrollX;
        const scrollY = this.cameras.main.scrollY;

        // Adjust clouds position relative to camera
        this.clouds.x = scrollX + this.cameraWidth / 2;
        this.clouds.y = scrollY + this.cameraHeight / 2;
        this.mist1.x = scrollX + this.cameraWidth / 2;
        this.mist1.y = scrollY + this.cameraHeight / 2;
        if (!this.isBouncing && !this.isDashing && this.controlsEnabled) {
            // Handle player movement
            this.slashRight.x = this.player.x + 20;
            this.slashLeft.x = this.player.x - 20;
            this.slashDown.x = this.player.x
            this.slashUp.x = this.player.x
            this.slashRight.y = this.player.y
            this.slashLeft.y = this.player.y
            this.slashDown.y = this.player.y + 40;
            this.slashUp.y = this.player.y - 40;
            if (this.cursors.left.isDown || this.wasd.A.isDown ) {
                this.playerContainer.body.setVelocityX(-180);
                this.player.anims.play('moveLeft', true);
                this.currDir = 'left';
                this.cdh = 'left';
                this.weapon.x = this.player.x - 20;
                this.weapon.y = this.player.y-50;
            } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
                this.playerContainer.body.setVelocityX(180);
                this.player.anims.play('moveRight', true);
                this.currDir = 'right';
                this.cdh = 'right';
                this.weapon.x = this.player.x + 40;
                this.weapon.y = this.player.y-50;
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
                this.weapon.x = this.player.x - 10;
                this.weapon.y = this.player.y - 90;
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
                this.weapon.x = this.player.x+30;
                this.weapon.y = this.player.y + 20;
            } else {
                this.playerContainer.body.setVelocityY(0);
                this.cdv = 'none';
            }
        }

        if (this.uiop.I.isDown && !this.isDashing && this.iKeyEnabled && this.controlsEnabled) {
            this.playerDash(this.playerContainer);
            console.log(this.playerContainer.x, this.playerContainer.y);
        }

        // Handle JKL key presses to change tint with a cooldown
        const currentTime = this.time.now; // Get the current time
        if (currentTime - this.lastColorChangeTime > 3000 && this.controlsEnabled) { // Check if 3 seconds have passed
            if (this.jkl.J.isDown  && this.currColor != 'blue') {
                this.blueSFX.play();
                this.slashRight.setTint(0x0000ff);
                this.slashLeft.setTint(0x0000ff);
                this.slashUp.setTint(0x0000ff);
                this.slashDown.setTint(0x0000ff);
                this.currColor = 'blue';
                this.lastColorChangeTime = currentTime; // Update the last color change time
                this.weapon.anims.play('weaponBlue');
            } else if (this.jkl.K.isDown  && this.currColor !='red') {
                this.redSFX.play();
                this.slashRight.setTint(0xff0000);
                this.slashLeft.setTint(0xff0000);
                this.slashUp.setTint(0xff0000);
                this.slashDown.setTint(0xff0000);
                this.currColor = 'red';
                this.lastColorChangeTime = currentTime; // Update the last color change time
                this.weapon.anims.play('weaponRed');
            } else if (this.jkl.L.isDown && this.currColor != 'yellow') {
                this.yellowSFX.play();
                this.slashRight.setTint(0xffff00);
                this.slashLeft.setTint(0xffff00);
                this.slashUp.setTint(0xffff00);
                this.slashDown.setTint(0xffff00);
                this.currColor = 'yellow';
                this.lastColorChangeTime = currentTime; // Update the last color change time
                this.weapon.anims.play('weaponYellow');
            }
        }

        if (this.uiop.U.isDown && this.uKeyEnabled && this.controlsEnabled) {
            this.createHitbox();
        }

        //player color
        if(this.playerInvulnerable == true){
            this.player.setAlpha(0.5); 
        }

        //enemies
        this.Seraphims.children.each((seraphim) => {
            if(seraphim.col == 'default'){
                seraphim.anims.play('flyDefault', true);
            }else if(seraphim.col == 'blue'){
                seraphim.anims.play('flyBlue', true);
            }else if(seraphim.col == 'red'){
                seraphim.anims.play('flyRed', true);
            }else if(seraphim.col == 'yellow'){
                seraphim.anims.play('flyYellow', true);
            }
        }, this);

        this.Thrones.children.each((throne) => {
            if(throne.col == 'default'){
                throne.anims.play('bounceDefault', true);
            }else if(throne.col == 'blue'){
                throne.anims.play('bounceBlue', true);
            }else if(throne.col == 'red'){
                throne.anims.play('bounceRed', true);
            }else if(throne.col == 'yellow'){
                throne.anims.play('bounceYellow', true);
            }
        }, this);

        this.Hands.children.each((hand) => {
            hand.anims.play('handAttack', true);
        })

         // Remove projectiles that are out of the screen
        this.seraProjs.children.each((projectile) => {
            if (projectile.y > 2000 || projectile.y < -600) { // Assuming the game height is 600
                projectile.destroy();
            }
        }, this);

        //eligius
        this.timeSinceLastChange += delta;

        // Check if it's time to change direction
        if (this.timeSinceLastChange >= this.changeDirectionInterval && this.eligiusMovable == true) {
            // Reset the timer
            this.timeSinceLastChange = 0;

            // Change direction with some randomness
            if(this.eligiusMovable == true){
                this.eligius.setVelocity(Phaser.Math.Between(-300, 300), Phaser.Math.Between(-300, 300));
            }else{
                this.eligius.setVelocity(0,0);
            }
        }

        let distanceX = this.eligius.x - this.player.x;
        let distanceY = this.eligius.y - this.player.y;

        // Check if eligius is too far from the player
        if (Math.abs(distanceX) > this.maxDistance || Math.abs(distanceY) > this.maxDistance) {
            // Adjust position to stay within the max distance
            if (Math.abs(distanceX) > this.maxDistance) {
                this.eligius.x = this.player.x + (this.maxDistance * Math.sign(distanceX));
            }
            if (Math.abs(distanceY) > this.maxDistance) {
                this.eligius.y = this.player.y + (this.maxDistance * Math.sign(distanceY));
            }

            // Change direction to move back towards the player
            this.eligius.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
        }

        this.orbAngle1 += this.orbSpeed;
        this.orb1.x = this.eligius.x + this.orbRadius * Math.cos(this.orbAngle1);
        this.orb1.y = this.eligius.y + this.orbRadius * Math.sin(this.orbAngle1);
    
        // Update the position of orb2
        this.orbAngle2 += this.orbSpeed;
        this.orb2.x = this.eligius.x + this.orbRadius * Math.cos(this.orbAngle2);
        this.orb2.y = this.eligius.y + this.orbRadius * Math.sin(this.orbAngle2);

        if (this.playerHp == 4){
            this.hearts.anims.play('heart4');
        }else if(this.playerHp == 3){
            this.hearts.anims.play('heart3');
        }else if(this.playerHp == 2){
            this.hearts.anims.play('heart2');
        }else if(this.playerHp == 1){
            this.hearts.anims.play('heart1');
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
    
        // Check if the enemy is currently vulnerable to damage
        if (!enemy.isInvulnerable && enemy.active) {
            if (enemy.class === "seraphim") {
                this.seraDamage(enemy, 1); // Adjust as per your damage function
            }
            else if(enemy.class === "throne"){
                this.throneDamage(enemy,1);
            }
            else if(enemy.class === "throne"){
                this.bossDamage(enemy,1);
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
    if(this.playerHp > 0){
        if(this.playerInvulnerable == false && enemy.active){
            if(enemy.class == "projectile"){
                enemy.destroy();
            }
            this.playerHp -= 1;
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
    }else{
        this.scene.start('GameOverScene', {score: this.score});
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
        const projectile = this.seraProjs.create(seraphim.x, seraphim.y, 'seraProj').setOrigin(-0.55, -0.55).setScale(0.5);
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
        let seraphimC;
      
        const tintChoice = Phaser.Math.Between(1, 4); // 1 = Red, 2 = Blue, 3 = Yellow, 4 = Uncolored (all colors vulne)
        switch (tintChoice) {
          case 1:
            seraphimC = 'seraphimRed';
            break;
          case 2:
            seraphimC = 'seraphimBlue';
            break;
          case 3:
            seraphimC = 'seraphimYellow';
            break;
          case 4: // No tint
            seraphimC = 'seraphim';
            break;
          default:
            break;
        }
      
        const seraphim = this.Seraphims.create(centerX, centerY, seraphimC).setOrigin(-0.02, 0.15).setScale(0.6);
        seraphim.class = "seraphim";
      
        if (seraphimC === 'seraphim') {
          seraphim.color = ['red', 'blue', 'yellow'];
          seraphim.col = 'default';
        } else if (seraphimC === 'seraphimRed') {
          seraphim.color = ['red'];
          seraphim.col = 'red';
        } else if (seraphimC === 'seraphimBlue') {
          seraphim.color = ['blue'];
          seraphim.col = 'blue';
        } else if (seraphimC === 'seraphimYellow') {
          seraphim.color = ['yellow'];
          seraphim.col = 'yellow';
        }
      
        // Randomly choose between different ranges
        const randomChoice = Phaser.Math.Between(1, 2); // Example: choose between 1 to 4
      
        if (randomChoice === 1) {
          centerY = Phaser.Math.Between(60, 100); // Range 1
        } else if (randomChoice === 2) {
          centerY = Phaser.Math.Between(600, 650); // Default or Range 4
        }
      
        // Generate a random radius for the circular path
        const radius = Phaser.Math.Between(50, 150); // Random radius between 50 and 150
      
        // Create a new enemy at the center position
        seraphim.setPosition(centerX, centerY);
      
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
      
        seraphim.shoot = this.time.addEvent({
          delay: 2500,
          loop: true,
          callback: () => this.seraShoot(seraphim),
          callbackScope: this,
          loop: true
        });
    }

    seraDamage(seraphim, damageAmount) {
        seraphim.hp -= damageAmount;
        if (seraphim.hp <= 0) {
            // Handle seraphim defeat or destruction
            this.destroySeraphim(seraphim);
        }
    }
    
    destroySeraphim(seraphim) {
        seraphim.destroy();
        this.score+=100;
        this.scoreText.setText('Score: ' + this.score);
    }

    destroySeraphimNoScore(seraphim) {
        seraphim.destroy();
    }

    throneSpawn() {
        // Generate random x and y coordinates for the throne spawn position
        let centerX;
        let centerY;
        let throneC;
        const randomVelocity = Phaser.Math.Between(80,200);
    
        const tintChoice = Phaser.Math.Between(1, 4); // 1 = Red, 2 = Blue, 3 = Yellow, 4 = Uncolored (all colors vulne)
        switch (tintChoice) {
            case 1:
                throneC = 'throneRed';
                break;
            case 2:
                throneC = 'throneBlue';
                break;
            case 3:
                throneC = 'throneYellow';
                break;
            case 4: // No tint
                throneC = 'throne';
                break;
            default:
                break;
        }

        // Randomly choose between different ranges
        const randomChoice = Phaser.Math.Between(1, 2); // Example: choose between 1 to 4
    
        if (randomChoice === 1) {
            centerY = Phaser.Math.Between(200,550); // Range 1
            centerX = Phaser.Math.Between(200, 1300);
        } else if (randomChoice === 2) {
            centerY = Phaser.Math.Between(1000, 1200); // Default or Range 4
            centerX = Phaser.Math.Between(200, 700);
        }

        const throne = this.Thrones.create(centerX, centerY, throneC).setOrigin(-0.02, 0.15).setScale(0.75);
        throne.setVelocity(randomVelocity,randomVelocity);
        throne.setBounce(1);
        throne.class = "throne";
        throne.hp = 3;
    
        if (throneC === 'throne') {
            throne.color = ['red', 'blue', 'yellow'];
            throne.col = 'default';
        } else if (throneC === 'throneRed') {
            throne.color = ['red'];
            throne.col = 'red';
        } else if (throneC === 'throneBlue') {
            throne.color = ['blue'];
            throne.col = 'blue';
        } else if (throneC === 'throneYellow') {
            throne.color = ['yellow'];
            throne.col = 'yellow';
        }

        throne.setActive(false).setAlpha(0.5);
        this.time.delayedCall(1000, () => {
          throne.setActive(true).setAlpha(1);
        });
    }

    throneTileCollision(throne, tile) {
        // Determine the direction of the collision
        const isCollidingLeft = (tile.faceLeft && throne.body.touching.right);
        const isCollidingRight = (tile.faceRight && throne.body.touching.left);
        const isCollidingUp = (tile.faceTop && throne.body.touching.bottom);
        const isCollidingDown = (tile.faceBottom && throne.body.touching.top);
    
        // Adjust velocity based on collision direction
        let newVelocityX = throne.body.velocity.x;
        let newVelocityY = throne.body.velocity.y;
    
        if (isCollidingLeft || isCollidingRight) {
            newVelocityX *= -1; // Reverse X velocity
        }
    
        if (isCollidingUp || isCollidingDown) {
            newVelocityY *= -1; // Reverse Y velocity
        }
    
        throne.setVelocity(newVelocityX, newVelocityY);
    }

    throneDamage(throne, damageAmount) {
        throne.hp -= damageAmount;
        if (throne.hp <= 0) {
            // Handle throne defeat or destruction
            this.destroyThrone(throne);
        }
    }

    destroyThrone(throne) {
        throne.destroy();
        this.score+=50;
        this.scoreText.setText('Score: ' + this.score);
    }

    destroyThroneNoScore(throne) {
        throne.destroy();
    }

    enableColliders(){
        this.Seraphims.children.each((seraphim) => {
            this.physics.add.collider(this.player, seraphim, () => {
                this.playerBounce(this.playerContainer, seraphim);
            }, null, this);
        }, this);

        this.Thrones.children.each((throne) => {
            this.physics.add.overlap(this.player, throne, () => {
                this.playerBounce(this.playerContainer, throne);
            }, null, this);
        }, this);
    }

    spawnEligiusCutscene(){
        if (!this.destructionSFXPlayed) {
            this.destructionSFX.play();
            this.destructionSFXPlayed = true;
        }
        const camera = this.cameras.main;
        camera.shake(8000, 0.002);
        this.playerContainer.body.setVelocityX(0);
        this.playerContainer.body.setVelocityY(0);
        this.controlsEnabled = false;
        this.playBGM.stop();
        this.seraEvent.paused = true;
        this.throneEvent.paused = true;
        this.playerInvulnerable = true;

        this.Seraphims.children.each((seraphim) => {
            seraphim.body.setVelocityX(0);
            seraphim.body.setVelocityY(0);
            seraphim.active = false;
            seraphim.shoot.paused = true;
          }, this);
        
        this.Thrones.children.each((throne) => {
            throne.body.setVelocityX(0);
            throne.body.setVelocityY(0);
            throne.active = false;
        }, this);
        
        this.time.delayedCall(8000, () => {
            this.Seraphims.children.each((seraphim) => {
                this.destroySeraphimNoScore(seraphim);
            }, this);
    
            this.Thrones.children.each((throne) => {
                this.destroyThroneNoScore(throne);
            }, this);
            this.bossBGM.play();
            this.controlsEnabled = true;
            this.eligius.setActive(true).setVisible(true);
            this.eligiusMovable = true;
            this.eligius.x = 507;
            this.eligius.y = 570; 
            this.handSpawnRate = 500;

            this.time.addEvent({
                delay: this.handSpawnRate,
                callback: this.handSpawn,
                callbackScope: this,
                loop: true
            });

            this.playerInvulnerable = false;
            this.player.setAlpha(1);

            this.time.addEvent({
                delay: this.orbSpawnRate,
                callback: this.spawnOrbs,
                callbackScope: this,
                loop: true
            });
            this.seraProjs.add(this.orb1);
            this.seraProjs.add(this.orb2);
            this.orb1.setVisible(true);
            this.orb2.setVisible(true);
            this.bossText = this.add.text(550,500, 'Eligius, Saint of Stones', { fontFamily: 'antiquity', fontSize: '24px',  
                fill: '#fbeae3', 
            }).setOrigin(0);
            this.uiContainer.add(this.bossText);
        })
    }

    handSpawn() {
        let centerX;
        let centerY;

        // Randomly choose between different ranges
        const randomChoice = Phaser.Math.Between(1, 2); // Example: choose between 1 to 4
    
        if (randomChoice === 1) {
            centerY = Phaser.Math.Between(100,800); // Range 1
            centerX = Phaser.Math.Between(200, 1300);
        } else if (randomChoice === 2) {
            centerY = Phaser.Math.Between(800, 1200); // Default or Range 4
            centerX = Phaser.Math.Between(200, 1300);
        }

        const hand = this.Hands.create(centerX, centerY, 'handAttack').setOrigin(-0.02, 0.15).setScale(0.75);
        hand.class = "hand";

        hand.setActive(false).setAlpha(0.5);
        this.time.delayedCall(1000, () => {
          hand.setActive(true).setAlpha(1);
        });

        this.time.delayedCall(2100, () => {
            hand.destroy();
          });
    }

    enableCollidersHands(){
        this.Hands.children.each((hand) => {
            this.physics.add.overlap(this.player, hand, () => {
                this.playerBounce(this.playerContainer, hand);
            }, null, this);
        }, this);
    }

    spawnOrbs() {
        this.eligius.anims.play("eligiusSpell");
        this.time.delayedCall(400, () => {
            this.laserSFX.play();
            this.orbs = this.physics.add.group({
              key: 'bossOrb',
              repeat: 11,
              setXY: { x: Phaser.Math.Between(20, 100), y:this.playerContainer.body.y-210, stepX: Phaser.Math.Between(130, 180) }
            });
          
            this.orbs.children.iterate((orb) => {
              orb.play('bossOrb');
          
              // Add the laser event to each orb
              this.time.addEvent({
                delay: 2000,
                callback: this.orbLasers,
                callbackScope: this,
                args: [orb]
              });
    
                this.time.delayedCall(2700, () => {
                orb.destroy();
              }, [], this);
            });
        });
      }

    orbLasers(orb) {
        if (!orb.active) {
          return; 
        }
        // Set velocity based on angle towards player
        const laser = this.seraProjs.create(orb.x, orb.y+500, 'bossLaser');
        laser.anims.play('bossLaser', true);
      
        orb.laser = laser;
      
        // Destroy the laser after 1 seconds
        this.time.delayedCall(800, () => {
          laser.destroy();
          this.eligius.anims.play("eligiusIdle");
        }, [], this);
      }

      handleEligius(enemy) {
        if (this.eligiusHp > 0) {
            if (!enemy.isInvulnerable && enemy.active && !enemy.cooldown) { // Check cooldown flag
                this.eligiusHp -= 1;
                enemy.setAlpha(0.5);
                enemy.isInvulnerable = true;
                enemy.cooldown = true; // Set cooldown flag to true
    
                this.time.delayedCall(500, () => {
                    enemy.isInvulnerable = false;
                    enemy.setAlpha(1);
                }, [], this);
    
                // Set cooldown duration (e.g., 1000ms)
                this.time.delayedCall(1000, () => {
                    enemy.cooldown = false; // Reset cooldown flag after duration
                }, [], this);
            }
        } else {
            this.eligius.setVisible(false);
            this.orb1.setVisible(false);
            this.orb2.setVisible(false);
            this.seraProjs.remove(this.orb1, false); // Second parameter determines whether to destroy the orb or not
            this.seraProjs.remove(this.orb2, false); // Pass true if you want to destroy the orb, otherwise false
            this.score+=2500;
            this.scoreText.setText('Score: ' + this.score);
            this.scene.start('GameWinScene', {score: this.score});
        }
    }

    spawnFaster(){
        this.SeraphimSpawnRate -= 5000;        
        this.ThroneSpawnRate -= 1000;
    }
}