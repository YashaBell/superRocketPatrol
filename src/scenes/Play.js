class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.spritesheet('miniNukeFlying', './assets/miniNuke.png', {frameWidth: 20, frameHeight: 43, startFrame: 0, endFrame: 2});
        this.load.image('miniNuke', './assets/miniNukeGrounded.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('interceptor', './assets/interceptor.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create(){
        //tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480, 'starfield').setOrigin(0,0);

        this.add.rectangle(0,borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00ff00).setOrigin(0,0);
        //add rocket (p1)
        this.anims.create({
            key: 'fired',
            frames: this.anims.generateFrameNumbers('miniNukeFlying', {start: 0, end: 2, first: 0}),
            frameRate: 30
        });
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'miniNuke').setOrigin(0.5,0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, 1).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, 1).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, 1).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width, borderUISize*7 + borderPadding*5, 'interceptor', 0, 40, 2).setOrigin(0,0);
        
        //key binds
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create ({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // start score
        this.p1Score = 0;
        //display score
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        scoreConfig.fixedWidth = 0;
        // Game Over flag
        this.gameOver = false;
        //60 sec play time clock
        /*this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);*/
        this.time = this.add.text(game.config.width /2 , borderUISize + borderPadding*2,'', scoreConfig);
        this.startTime = Math.floor(this.sys.game.loop.time/1000)
        //white border
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xffffff).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xffffff).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xffffff).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xffffff).setOrigin(0,0);
    }
    update(){

        const pointer = this.input.activePointer;
        pX = pointer.worldX;
        this.click = false;
        if(pointer.isDown)
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start('menuScene');
        }
        this.starfield.tilePositionX -= 4;
        if(!this.gameOver) {
            this.p1Rocket.update(pointer.worldX, pointer.isDown);
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            this.currentTime = (Math.floor(this.sys.game.loop.time/1000) - this.startTime).toString();
            this.time.setText(`time : ${game.settings.gameTimer - this.currentTime } `);
            if( this.currentTime > game.settings.gameTimer){
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
                this.gameOver = true;
        }
        }
        this.sys.game.loop.delta
        //collision detection
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        if(rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height && 
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    } 

    shipExplode(ship) {
        //hide ship
        ship.alpha  = 0;
        // create explosion at ship location
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode'); //play animation
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        game.settings.gameTimer += 10;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}   
