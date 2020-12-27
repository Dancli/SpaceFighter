class Laser extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'laser');
    }

    fire(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-400);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if(this.y <= -50) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class Lasers extends Phaser.Physics.Arcade.Group {

    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            classType: Laser,
            key: 'laser',
            frameQuantity: 8,
            active: false,
            visible: false
        });
    }

    fireLaser(x, y) {
        const laser = this.getFirstDead(false);
        if (laser) {
            laser.fire(x, y);
        }
    }
}

class MainScene extends Phaser.Scene {

    constructor() {
        super();
        this.background; // jshint ignore:line
        this.player; // jshint ignore:line
        this.cursors; // jshint ignore:line
        this.spacebar; // jshint ignore:line
        this.lasers; // jshint ignore:line
    }
    
    playerAnimations() {
        this.anims.create({
            key: 'idle',
            frames: [ { key:'fighter', frame: 0 }],
            frameRate: 10
        });
    
        this.anims.create({
            key: 'left',
            frames: [ { key:'fighter', frame: 1} ],
            frameRate: 10
        });
    
        this.anims.create({
            key: 'right',
            frames: [ { key:'fighter', frame: 2} ],
            frameRate: 10
        });
    
        this.anims.create({
            key:'up',
            frames: [ { key:'fighter', frame: 3} ],
            frameRate: 10
        });
    
        this.anims.create({
            key:'up-left',
            frames: [ { key:'fighter', frame: 4} ],
            frameRate: 10
        });
    
        this.anims.create({
            key:'up-right',
            frames: [ { key:'fighter', frame: 5} ],
            frameRate: 10
        });
    
        this.anims.create({
            key:'down',
            frames: [ { key:'fighter', frame: 6} ],
            frameRate: 10
        });
    
        this.anims.create({
            key:'down-left',
            frames: [ { key:'fighter', frame: 7} ],
            frameRate: 10
        });
    
        this.anims.create({
            key:'down-right',
            frames: [ { key:'fighter', frame: 8} ],
            frameRate: 10
        });
    }

    playerControls() {

        this.background.tilePositionY -= 3;
        
        this.player.setVelocity(0);
        
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.lasers.fireLaser(this.player.x, this.player.y);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
            this.player.anims.play('up', true);
        }
        
        if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
            this.player.anims.play('down', true);
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
        }

        if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        }

        if (this.cursors.up.isDown && this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.setVelocityY(-200);
            this.player.anims.play('up-left', true);
        } 
        
        if (this.cursors.down.isDown && this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.setVelocityY(200);
            this.player.anims.play('down-left', true);
        }
        
        if (this.cursors.up.isDown && this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.setVelocityY(-200);
            this.player.anims.play('up-right', true);
        } 
        
        if (this.cursors.down.isDown && this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.setVelocityY(200);
            this.player.anims.play('down-right', true);
        }
        
        if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
            this.player.anims.play('idle', true);
        }

    }

    preload() {

        this.load.image('space', 'static/img/assets/space.png');
        this.load.image('laser', 'static/img/assets/laser.png');
        this.load.spritesheet('fighter', 'static/img/assets/fighter.png', {frameWidth: 39, frameHeight: 43});
        this.load.spritesheet('asteroids', 'static/img/assets/asteroids.png', {frameWidth: 63, frameHeight: 63});

    }

    create() {

        this.background = this.add.tileSprite(0, 0, 360, 640, 'space').setOrigin(0).setScrollFactor(0, 1);
           
        const positionX = this.cameras.main.width / 2;
        const positionY = this.cameras.main.height - 64;

        this.lasers = new Lasers(this);
    
        this.player = this.physics.add.sprite(positionX, positionY, 'fighter');
        this.player.setCollideWorldBounds(true);

        this.playerAnimations();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.spacebar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

    }

    update() {

        this.playerControls();

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
