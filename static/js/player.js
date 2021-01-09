class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'fighter');

        this.scene = scene;
    }

    // Adds a player to the game.
    add() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.animations();
        this.setCollideWorldBounds(true);
    }
    
    // These are the animations used by the player's sprite.
    animations() {
        this.scene.anims.create({
            key: 'idle',
            frames: [ { key: 'fighter', frame: 0 }],
            frameRate: 10
        });
    
        this.scene.anims.create({
            key: 'left',
            frames: [ { key: 'fighter', frame: 1 } ],
            frameRate: 10
        });
    
        this.scene.anims.create({
            key: 'right',
            frames: [ { key: 'fighter', frame: 2 } ],
            frameRate: 10
        });
    
        this.scene.anims.create({
            key:'up',
            frames: [ { key: 'fighter', frame: 3 } ],
            frameRate: 10
        });
    
        this.scene.anims.create({
            key:'up-left',
            frames: [ { key: 'fighter', frame: 4 } ],
            frameRate: 10
        });
    
        this.scene.anims.create({
            key:'up-right',
            frames: [ { key: 'fighter', frame: 5 } ],
            frameRate: 10
        });
    
        this.scene.anims.create({
            key:'down',
            frames: [ { key: 'fighter', frame: 6 } ],
            frameRate: 10
        });
    
        this.scene.anims.create({
            key:'down-left',
            frames: [ { key: 'fighter', frame: 7 } ],
            frameRate: 10
        });
    
        this.scene.anims.create({
            key:'down-right',
            frames: [ { key: 'fighter', frame: 8 } ],
            frameRate: 10
        });
    }

    // The following methods will cover all of the 9 directions the player can take.

    up() {
        this.setVelocityY(-200);
        this.anims.play('up', true);
    }

    down() {
        this.setVelocityY(200);
        this.anims.play('down', true);
    }

    left() {
        this.setVelocityX(-200);
        this.anims.play('left', true);
    }

    right() {
        this.setVelocityX(200);
        this.anims.play('right', true);
    }

    upLeft() {
        this.setVelocityX(-200);
        this.setVelocityY(-200);
        this.anims.play('up-left', true);
    }

    downLeft() {
        this.setVelocityX(-200);
        this.setVelocityY(200);
        this.anims.play('down-left', true);
    }

    upRight() {
        this.setVelocityX(200);
        this.setVelocityY(-200);
        this.anims.play('up-right', true);
    }

    downRight() {
        this.setVelocityX(200);
        this.setVelocityY(200);
        this.anims.play('down-right', true);
    }

    idle() {
        this.anims.play('idle', true);
    }
}

export default Player;