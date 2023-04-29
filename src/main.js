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
let pX;
game.settings = {spaceshipSpeed: 3, gameTimer: 60, inputType: 'KEYS'};
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
function MouseInTextBox(pointerX, pointerY, textBox){
    let x1 = textBox.x - textBox.width/2;
    let x2 = textBox.x + textBox.width/2;
    let y1 = textBox.y - textBox.height/2;
    let y2 = textBox.y + textBox.height/2;
    if(pointerX >= x1 && pointerX <= x2 && pointerY >= y1 && pointerY <= y2){
        return(true);
    }else {
        return(false);
    }
}
