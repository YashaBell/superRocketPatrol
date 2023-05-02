class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speedMulti){
        super(scene, x, y, texture, frame);
        this.frameName= texture;
        console.log(this.frameName);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = speedMulti * game.settings.spaceshipSpeed;
        if(this.frameName != 'powerarmor'){
            this.setSize(80,50);
            this.setDisplaySize(80,50);
            this.fly = this.scene.add.sprite(this.x, this.y , 'vertibird').setOrigin(0,0);
            this.fly.setSize(80,50);
            this.fly.setDisplaySize(80,50);
            this.fly.anims.play('zoom');
            this.alpha = 0;
        }
    }

    update() {
        if(this.frameName != 'powerarmor'){
            this.fly.x = this.x;
            this.fly.y = this.y;
            this.fly.on('animationcomplete', () => {this.fly.anims.play('zoom');});
        }
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;

        if(this.frameName = 'powerarmor'){this.alpha = 1;}
    }
}