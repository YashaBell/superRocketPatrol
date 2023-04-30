class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.isFiring = false;
        this.moveSpeed = 2;
        this.canFire = false;
        scene.add.existing(this);
        this.fly = this.scene.add.sprite(-100, -100, 'miniNukeF').setOrigin(0.5,0);
        this.fly.anims.play('fired');
    }

    update(pX, pIsDown) {
        this.fly.on('animationcomplete', () => {this.fly.anims.play('fired');});
        if(game.settings.inputType == 'KEYS'){
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
                if(pX < this.x - 3 && this.x >= borderUISize + this.width){
                    this.x -= this.moveSpeed;
                } else if (pX > this.x + 3 && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }
            //requires the player to release the mouse before firing again
            if(!pIsDown){
                this.canFire = true;
            }
            // fire 
            if(pIsDown && !this.isFiring && this.canFire) {
                this.isFiring = true;
                this.sfxRocket.play();
            }
            // if fired move up
            if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
                this.y -= this.moveSpeed;
                this.alpha = 0;
                this.fly.alpha = 1;
                this.fly.x = this.x;
                this.fly.y = this.y;
            }
            // reset on miss
            if(this.y <= borderUISize * 3 + borderPadding) {
                this.reset();
            }
        }
    }
    reset() {
        this.fly.x = -100;
        this.fly.y = -100;
        this.alpha = 1;
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
        this.canFire = false;
    }
}