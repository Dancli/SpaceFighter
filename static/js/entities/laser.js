class Laser extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'laser');
    }
    /*
        The player can shoot lasers to beat down enemies.
        Lasers will follow a straight pattern towards the top of the screen from the position the player is.
        Only 5 lasers are allowed to exist in the screen, but they will be reloaded again as they leave.
    */
    fire(x, y) {
        this.body.reset(x, y);
        this.enableBody(
            true,
            x,
            y,
            true,
            true
        );
        this.scene.sound.play('shoot-01');
        this.setVelocityY(-400);
    }

    // Lasers will disappear once they reach the very top of the screen.
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if(this.y <= 0) {
            this.disableBody(true, true);
        }
    }
}

class LaserGroup extends Phaser.Physics.Arcade.Group {

    constructor(scene) {
        super(scene.physics.world, scene);

        this.config = {
            classType: Laser,
            key: 'laser',
            frameQuantity: 3,
            active: false,
            visible: false,
            repeat: -1,
            setXY: {
                x: -200,
                y: -100
            }
        };
        
        this.createMultiple(this.config);
    }

    // Allows each member of the pool to move at high speeds accross the screen towards the top.
    fireLaser(x, y) {
        const laser = this.getFirstDead(false);
        if (laser) {
            laser.fire(x, y);
        }
    }
}

export default LaserGroup;
