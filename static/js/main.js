// import IntroScene from "./scenes/intro.js";
import IntroScene from "./scenes/intro.js";
import GameScene from "./scenes/game.js";
import GameOverScene from "./scenes/game-over.js";

const config = {
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    backgroundColor: '#000',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: [ IntroScene, GameScene, GameOverScene ]
    
};

const game = new Phaser.Game(config);
