import EnemyGroup from "../entities/enemy.js";
import EnemyLaserGroup from "../entities/enemy-laser.js";
import LaserGroup from "../entities/laser.js";
import Player from "../entities/player.js";

class GameScene extends Phaser.Scene {

    constructor() {
        super('game');

        // jshint ignore:start
        this.background;
        this.player;
        this.lasers;
        this.enemies;
        this.enemyLasers;
        this.cursors;
        this.qKey;
        // jshint ignore:end
        this.timer = 0;
        this.spawnTime = 3000;
        this.finalScore = 0;
        this.gameOver = false;

    }

    preload() {
        this.load.image('space', 'static/img/assets/space.png');
        this.load.image('laser', 'static/img/assets/laser.png');
        this.load.image('enemy-laser', 'static/img/assets/enemy-laser.png');
        this.load.spritesheet('fighter', 'static/img/assets/fighter.png', {frameWidth: 39, frameHeight: 43});
        this.load.spritesheet('enemy', 'static/img/assets/enemy.png', {frameWidth: 39, frameHeight: 43});
        this.load.audio('background-music', 'static/audio/background-music.mp3');
        this.load.audio('shoot-01', 'static/audio/shoot-01.wav');
        this.load.audio('shoot-02', 'static/audio/shoot-02.wav');
        this.load.audio('hit', 'static/audio/hit.wav');

    }

    create() {
        this.background = this.add.tileSprite(0, 0, 360, 640, 'space').setOrigin(0).setScrollFactor(0, 1);

        this.sound.add('shoot-01');
        this.sound.add('shoot-02', { volume: 0.5 });
        this.sound.add('hit');

        const backgroundMusic = this.sound.add('background-music', {loop: true, volume: 1});
        backgroundMusic.play();

        this.player = new Player(this, this.cameras.main.width / 2, this.cameras.main.height - 64);
        this.lasers = new LaserGroup(this);
        this.enemies = new EnemyGroup(this);
        this.enemyLasers = new EnemyLaserGroup(this);
        
        this.player.add();
        
        this.enemies.enemyAnimations();
        
        let score = 0;
        let txt_score = this.add.text(16, 600, 'Score: 0', { fontSize: '24px', color: '#fff' });

        this.physics.add.collider(this.enemies, this.lasers, function(enemy, laser) {
            enemy.disableBody(true, true);
            laser.disableBody(true, true);
            this.sound.play('hit');
            score += 10;
            txt_score.setText('Score: ' + score);
        }, null, this);
        this.physics.add.collider(this.player, this.enemies, function() {
            backgroundMusic.destroy();
            this.finalScore = score;
            this.gameOver = true;
        }, null, this);
        this.physics.add.collider(this.player, this.enemyLasers, function() {
            backgroundMusic.destroy();
            this.finalScore = score;
            this.gameOver = true;
        }, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        // Due to key ghosting on certain keyboards, the Q key is the one I chose for the player to shoot.
        this.qKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Q
        );

    }

    update(time, delta) {

        if (this.gameOver == true) {
            let score = this.finalScore;
            this.timer = 0;
            this.spawnTime = 3000;
            this.gameOver = false;
            this.registry.destroy();
            this.scene.start('game-over', { score });
        }

        this.background.tilePositionY -= 2;

        // Enemies will spawn on an accelerated rate, until it reaches the rate of 1 enemy per second.
        this.timer += delta;
        while (this.timer > this.spawnTime) {
            this.enemies.addEnemy(this.enemyLasers);
            this.timer -= this.spawnTime;
            if (this.spawnTime < 1000) {
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
        } if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) {
            this.player.idle();
        }
    }
}

export default GameScene;
