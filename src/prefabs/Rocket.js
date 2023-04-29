class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        this.sfxRocket = scene.sound.add('sfx_rocket');
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
    }

    update(pX, pIsDown) {
        if(game.settings.inputType == 'KEYS'){
            console.log("in keys loop");
            // left right movement
            if(!this.isFiring) {
                if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                    this.x -= this.moveSpeed;
                } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }
            // fire 
            if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
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
        if(game.settings.inputType == 'MOUSE'){
            if(!this.isFiring) {
                if(pX < this.x && this.x >= borderUISize + this.width){
                    this.x -= this.moveSpeed;
                } else if (pX > this.x && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }
            // fire 
            if(pIsDown && !this.isFiring) {
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
    }
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}