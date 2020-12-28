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

class LaserGroup extends Phaser.Physics.Arcade.Group {

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

export default LaserGroup;
