class Difficulty extends Phaser.Scene {
    constructor() {
        super("difficultyScene");
    }
    preload(){}
    create(){
        this.menu = this.add.tileSprite(0,0,640,480, 'menu').setOrigin(0,0);

        this.text1 = this.add.text(10, 10, '', { fill: '#00ff00' });

        //menu text configs
        if(this.game.settings.inputType == 'KEYS'){
            this.add.text(game.config.width/2, game.config.height/2, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        }
        if(this.game.settings.inputType == 'MOUSE'){
            this.noviceText = this.add.text(game.config.width/2, game.config.height/2 - (borderUISize + borderPadding) / 2, 'Click Here for Novice', menuConfig).setOrigin(0.5);
            this.expertText = this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding) / 2, 'Click Here for Expert', menuConfig).setOrigin(0.5);
            
        }
        // key define
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() { 
    const pointer = this.input.activePointer;

        if(pointer.isDown && MouseInTextBox(pointer.worldX, pointer.worldY, this.noviceText)){
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60,
                inputType: 'MOUSE'
            };
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(pointer.isDown && MouseInTextBox(pointer.worldX, pointer.worldY, this.expertText)){
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45,
                inputType: 'MOUSE'
            };
            this.sound.play('sfx_select');
            this.scene.start('playScene');

        }

        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60,
                inputType: 'KEYS'
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45,
                inputType: 'KEYS'
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}
