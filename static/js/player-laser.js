class Laser extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'laser');
    }

    // This method activates the laser.
    fire(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-400);
    }

    // Fired lasers will be set inactive once they reach the end of the screen.
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if(this.y <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class LaserGroup extends Phaser.Physics.Arcade.Group {

    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple(
            {
            classType: Laser,
            key: 'laser',
            frameQuantity: 5,
            active: false,
            visible: false,
            repeat: -1
            }
        );
    }

    // Allows each member of the laser group to use the fire method of the Laser class.
    fireLaser(x, y) {
        const laser = this.getFirstDead(false);
        if (laser) {
            laser.fire(x, y);
        }
    }
}

export default LaserGroup;
