class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        this.sfxRocket = scene.sound.add('sfx_rocket');
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
    }

    update() {
        // left right movement
        if(!this.isFiring) {
            if(this.y >= game.config.height - rocketSpacing || this.y <= rocketSpacing){
                if(keyLEFT.isDown && this.x >= rocketSpacing){
                    this.x -= this.moveSpeed;
                } else if (keyRIGHT.isDown && this.x <= game.config.width - rocketSpacing) {
                    this.x += this.moveSpeed;
                }
            }
            if(this.x >= game.config.width - rocketSpacing || this.x <= rocketSpacing){
                if(keyUP.isDown && this.y >= rocketSpacing){
                    this.y -= this.moveSpeed;
                } else if (keyDOWN.isDown && this.y <= game.config.height - rocketSpacing) {
                    this.y += this.moveSpeed;
                }
            }
        }
    }
        // fire 
        /*if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }
        // if fired move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }
    */
    reset() {
        this.isFiring = false;
        this.y = game.config.height - rocketSpacing
    }
}