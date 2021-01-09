import EnemyGroup from "./enemy.js";
import EnemyLaserGroup from "./enemy-laser.js";
import LaserGroup from "./player-laser.js";
import Player from "./player.js";

class MainScene extends Phaser.Scene {

    constructor() {
        super();

        // jshint ignore:start
        this.background;
        this.player;
        this.lasers;
        this.enemies;
        this.enemyLasers;
        this.cursors;
        this.qKey;
        this.txt_score;
        // jshint ignore:end
        this.timer = 0;
        this.spawnTime = 3000;
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

        this.enemies = new EnemyGroup(this);
        this.enemies.enemyAnimations();

        this.enemyLasers = new EnemyLaserGroup(this);

        this.physics.add.collider(this.player, this.enemies, this.enemies.enemyHit(), null, this);
        this.physics.add.collider(this.player, this.enemyLasers, this.enemyLasers.enemyLaserHit(), null, this);
        this.physics.add.collider(this.enemies, this.lasers, this.lasers.laserHit(), null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        // Due to key ghosting on certain keyboards (like the one I use), the Q key is the one I chose for the player to shoot.
        this.qKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Q
        );

    }

    update(time, delta) {

        this.background.tilePositionY -= 2;

        // Enemies will spawn on an accelerated rate, until it reaches 1 enemy per second.
        this.timer += delta;
        while(this.timer > this.spawnTime) {
            this.enemies.addEnemy(this.enemyLasers);
            this.timer -= this.spawnTime;
            if(this.spawnTime < 1000) {
                this.spawnTime = 1000;
            } else {
                this.spawnTime -= 125;
            }
        }
        
        this.player.setVelocity(0);
        
        // These are the player's controls.
        if (Phaser.Input.Keyboard.JustDown(this.qKey)) {
            this.lasers.fireLaser(this.player.x, this.player.y - 21.5);
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
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: MainScene
};

const game = new Phaser.Game(config);
