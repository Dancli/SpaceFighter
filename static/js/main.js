import LaserGroup from "./player-laser.js";
import Player from "./player.js";

class MainScene extends Phaser.Scene {

    constructor() {
        super();

        this.background; // jshint ignore:line
        this.player; // jshint ignore:line
        this.lasers; // jshint ignore:line
        this.cursors; // jshint ignore:line
        this.qKey; // jshint ignore:line
    }

    preload() {

        this.load.image('space', 'static/img/assets/space.png');
        this.load.image('laser', 'static/img/assets/laser.png');
        this.load.image('enemy-laser', 'static/img/assets/enemy-laser.png');
        this.load.spritesheet('fighter', 'static/img/assets/fighter.png', {frameWidth: 39, frameHeight: 43});
        this.load.spritesheet('enemy', 'static/img/assets/enemy.png', {frameWidth: 39, frameHeight: 43});

    }

    create() {

        this.background = this.add.tileSprite(0, 0, 360, 640, 'space').setOrigin(0).setScrollFactor(0, 1);
        
        this.player = new Player(this, this.cameras.main.width / 2, this.cameras.main.height - 64);
        this.player.add();

        this.lasers = new LaserGroup(this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.qKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Q
        );

    }

    update() {

        this.background.tilePositionY -= 3;
        
        this.player.setVelocity(0);
        
        // Cursors
        if (Phaser.Input.Keyboard.JustDown(this.qKey)) {
            this.lasers.fireLaser(this.player.x, this.player.y);
        } if (this.cursors.up.isDown) {
            this.player.up();
        } if (this.cursors.down.isDown) {
            this.player.down();
        } if (this.cursors.left.isDown) {
            this.player.left();
        } if (this.cursors.right.isDown) {
            this.player.right();
        } if (this.cursors.up.isDown && this.cursors.left.isDown) {
            this.player.upLeft();
        } if (this.cursors.down.isDown && this.cursors.left.isDown) {
            this.player.downLeft();
        } if (this.cursors.up.isDown && this.cursors.right.isDown) {
            this.player.upRight();
        } if (this.cursors.down.isDown && this.cursors.right.isDown) {
            this.player.downRight();
        } if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
            this.player.idle();
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: MainScene
};

const game = new Phaser.Game(config);
