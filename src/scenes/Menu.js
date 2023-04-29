class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }
    create(){
        //menu text configs
        let menuConfig = {
            fontFamily: 'Conrier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - (borderUISize + borderPadding)*2, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press (F) for key controls:\n Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.mouseSettingsText = this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding) * 2, 'Press (Click here for mouse controls):\n Use (PointerPosition) to move & (LeftClick) to fire', menuConfig).setOrigin(0.5);
        // key define
        keyF= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.input.mouse.disableContextMenu();
    }
    update() {
        const pointer = this.input.activePointer;
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            game.settings = {
                inputType: 'KEYS'
            }
            this.sound.play('sfx_select');
            this.scene.start('difficultyScene');
        }

        if(pointer.isDown & MouseInTextBox(pointer.worldX, pointer.worldY, this.mouseSettingsText)) {
            game.settings = {
                inputType: 'MOUSE'
            }
            this.sound.play('sfx_select');
            this.scene.start('difficultyScene');
        }
    }
}
