class EnemyLaser extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'enemy-laser');
    }

    // This method activates the enemy laser.
    fire(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(250);
    }

    // Fired enemy lasers will be set inactive once they reach the end of the screen.
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if(this.y >= 640) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class EnemyLaserGroup extends Phaser.Physics.Arcade.Group {

    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple(
            {
            classType: EnemyLaser,
            key: 'enemy-laser',
            frameQuantity: 100,
            active: false,
            visible: false,
            repeat: -1
            }
        );
    }

    // Allows each member of the enemy laser group to use the fire method of the EnemyLaser class.
    fireLaser(x, y) {
        const enemyLaser = this.getFirstDead(false);
        if (enemyLaser) {
            enemyLaser.fire(x, y);
        }
    }
}

export default EnemyLaserGroup;
