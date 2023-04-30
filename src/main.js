let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    fps:{target: 30,},
    scene: [ Menu , Play , Difficulty ]

}
let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyF, keyR, keyLEFT, keyRIGHT, mouseLEFT;
let pX;
game.settings = {spaceshipSpeed: 3, gameTimer: 60, inputType: 'KEYS'};
let scoreConfig = {
    fontFamily: 'MS Gothic',
    fontSize: '24px',
    color: '#00ff00',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 100
}    
let menuConfig = {
    fontFamily: 'MS Gothic',
    fontSize: '24px',
    backgroundColor: '#000000',
    color: '#00ff00',
    align: 'center',
    padding: {
        top: 0,
        bottom: 0,
    },
    fixedWidth: 0
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
// 5-Point Tier
// Track a high score that persists across scenes and display it in the UI (5)
        // Implement the 'FIRE' UI text from the original game (5)
// Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
// Implement the speed increase that happens after 30 seconds in the original game (5)
// Randomize each spaceship's movement direction at the start of each play (5)
        // Create a new scrolling tile sprite for the background (5)
// Allow the player to control the Rocket after it's fired (5)
// 10-Point Tier
// Create 4 new explosion sound effects and randomize which one plays on impact (10)
        // Display the time remaining (in seconds) on the screen (10)
        // Using a texture atlas, create a new animated sprite for the Spaceship enemies (10)
        // Create a new title screen (e.g., new artwork, typography, layout) (10)
// Implement parallax scrolling for the background (10)
// 15-Point Tier
        // Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
// Implement an alternating two-player mode (15)
        // Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
        // Implement mouse control for player movement and mouse click to fire (15)
// Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (15)