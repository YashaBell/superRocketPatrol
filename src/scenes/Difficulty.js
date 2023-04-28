class Difficulty extends Phaser.Scene {
    constructor() {
        super("difficultyScene");
    }
    preload(){}
    create(){
        this.text1 = this.add.text(10, 10, '', { fill: '#00ff00' });

        //menu text configs
        let menuConfig = {
            fontFamily: 'Conrier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        if(this.game.settings.inputType == 'Keys'){
            this.add.text(game.config.width/2, game.config.height/2, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        }
        if(this.game.settings.inputType == 'Mouse'){
            this.add.text(game.config.width/2, game.config.height/2 - (borderUISize + borderPadding) / 2, 'Click Here side of screen for Novice', menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding) / 2, 'Click Here side of screen for Expert', menuConfig).setOrigin(0.5);
            
        }
        // key define
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() { 
        const pointer = this.input.activePointer;
        this.text1.setText([
            `x: ${pointer.worldX}`,
            `y: ${pointer.worldY}`
        ]);

        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}
