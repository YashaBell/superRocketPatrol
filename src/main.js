let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu , Play , Difficulty ]
}

let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyF, keyR, keyLEFT, keyRIGHT, mouseLEFT;

let scoreConfig = {
    fontFamily: 'Conrier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 100
}