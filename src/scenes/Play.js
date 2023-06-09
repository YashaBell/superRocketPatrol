class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.spritesheet('miniNukeF', './assets/miniNuke.png', {frameWidth: 20, frameHeight: 43, startFrame: 0, endFrame: 3});
        this.load.image('miniNukeG', './assets/miniNukeGrounded.png');
        this.load.spritesheet('vertibird', './assets/Vertibird.png', {frameWidth: 263, frameHeight: 163, startFrame: 0, endFrame: 7});
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('city', './assets/cityScape.png');
        this.load.image('powerarmor', './assets/powerarmor.png');
        this.load.atlas('debris', './assets/vertibirdBits.png', './assets/vertibirdBits.json')
    }
    create(){
        //tile sprite
        this.city = this.add.tileSprite(0,0,640,480, 'city').setOrigin(0,0);

        //add rocket (p1)
        //animation config
        this.anims.create({
            key: 'fired',
            frames: this.anims.generateFrameNumbers('miniNukeF', {start: 1, end: 3, first: 1}),
            frameRate: 10
        });
        this.anims.create({
            key: 'zoom',
            frames: this.anims.generateFrameNumbers('vertibird', {start: 0, end: 7, first: 0}),
            frameRate: 10
        });
        
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize     + borderPadding    , 'vertibird', 0, 30, 1).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize * 2 + borderPadding * 3, 'vertibird', 0, 20, 1).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width,                  borderUISize * 3 + borderPadding * 5, 'vertibird', 0, 10, 1).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width,                  borderUISize * 4 + borderPadding * 7, 'powerarmor', 0, 40, 2).setOrigin(0,0);
        
        //key binds
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        
        
        // start score
        this.p1Score = 0;
        //display score
        //scoreConfig.fixedWidth = 0;
        // Game Over flag
        this.gameOver = false;
        //60 sec play time clock
        /*this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);*/
        //white border
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0,0);
    
        this.time = this.add.text(game.config.width - borderPadding - scoreConfig.fixedWidth,  game.config.height - borderUISize - borderPadding / 2 ,'', scoreConfig);
        this.startTime = Math.floor(this.sys.game.loop.time/1000)
        scoreConfig.fixedWidth = 0;
        this.scoreLeft = this.add.text( borderPadding, game.config.height - borderUISize - borderPadding / 2, this.p1Score, scoreConfig);
        this.miniNuke = new Rocket(this, game.config.width/2, game.config.height - borderUISize, 'miniNukeG').setOrigin(0.5,0);
        
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
        //this.city.tilePositionX -= 4;
        if(!this.gameOver) {
            this.miniNuke.update(pointer.worldX, pointer.isDown, this.fly);
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            this.currentTime = (Math.floor(this.sys.game.loop.time/1000) - this.startTime).toString();
            while(game.settings.gameTimer - this.currentTime > 99){
                game.settings.gameTimer --;
            }
            this.time.setText(`time:${game.settings.gameTimer - this.currentTime } `);
            if( this.currentTime > game.settings.gameTimer){
                scoreConfig.fixedWidth = 0;
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', menuConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', menuConfig).setOrigin(0.5);
                this.gameOver = true;
        }
        }
        this.sys.game.loop.delta
        //collision detection
        if(this.checkCollision(this.miniNuke, this.ship04)) {
            this.miniNuke.reset();
            this.shipExplode(this.ship04);
        }
        if(this.checkCollision(this.miniNuke, this.ship03)) {
            this.miniNuke.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.miniNuke, this.ship02)) {
            this.miniNuke.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.miniNuke, this.ship01)) {
            this.miniNuke.reset();
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
        ship.alpha = 0;
        if(ship.frameName != 'powerarmor'){ship.fly.alpha = 0;}
        // create explosion at ship location
        let particle = this.add.particles(ship.x, ship.y, 'debris',{
            frame: { frames: [ 'vertiBit_01', 'vertiBit_02', 'vertiBit_03', 'vertiBit_04', 'vertiBit_05', 'vertiBit_06', 'vertiBit_07', 'vertiBit_08', 'vertiBit_09', 'vertiBit_10'], cycle: true },
            scale: .5,
            speed: 100,
            lifespan: 1000,
            gravityY: 200,
            stopAfter: 10

        });
        
        particle.on('complete', () => {
            ship.reset();
            if(ship.frameName != 'powerarmor'){ship.fly.alpha = 1;}
         });
        this.p1Score += ship.points;
        game.settings.gameTimer += 3;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}   
